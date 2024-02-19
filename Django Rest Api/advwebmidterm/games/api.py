from rest_framework.response import Response
from rest_framework import status
from .models import Primary_info
from .models import Secondary_info
from .models import Sale
from .serializers import primaryInfoSerializer
from .serializers import secondaryInfoSerializer
from .serializers import saleSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
import random
import collections

class gamesListApiView(APIView):
    def get(self,request, *args, **kwargs):
        
        allPrimaryInfo= Primary_info.objects.filter()
        serializer1 = primaryInfoSerializer(allPrimaryInfo , many=True)
        allSecondaryInfo= Secondary_info.objects.filter()
        serializer2 = secondaryInfoSerializer(allSecondaryInfo , many=True)
        allsale= Sale.objects.filter()
        serializer3 = saleSerializer(allsale , many=True)
        results=serializer1.data.copy()
        print(results)
        for i in range(len(results)):
            results[i].update(serializer2.data[i])
            results[i].update(serializer3.data[i])        
        return Response(results, status=status.HTTP_200_OK)

    def post(self,request, *args, **kwargs):
        data1 = {
            'rank': request.data.get('rank'), 
            'id':request.data.get('id'),
            'name':request.data.get('name'), 
        }
        data2={
            'id':request.data.get('id'),
            'platform':request.data.get('platform'), 
            'year':request.data.get('year'), 
            'genre':request.data.get('genre'), 
            'publisher':request.data.get('publisher')
        } 
        data3={
            'id':request.data.get('id'),
            'na_sale':request.data.get('na_sale'), 
            'eu_sale':request.data.get('eu_sale'), 
            'jp_sale':request.data.get('jp_sale'), 
            'other_sale':request.data.get('other_sale'), 
            'global_sale':request.data.get('global_sale')
        }
        serializer1 = primaryInfoSerializer(data=data1)
        serializer2 = secondaryInfoSerializer(data=data2)
        serializer3 = saleSerializer(data=data3)
        if serializer1.is_valid() and serializer2.is_valid() and serializer3.is_valid():
            serializer1.save()
            serializer2.save()
            serializer3.save()
            results=serializer1.data.copy()
            print(results)
            results.update(serializer2.data)
            results.update(serializer3.data)  
            return Response(results, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class gamesDetailApiView(APIView):
     def get_object(self, pk):
        try:
            primary_info=Primary_info.objects.get(pk=pk)
            secondary_info=Secondary_info.objects.get(pk=pk)
            sale=Sale.objects.get(pk=pk)
            game=[]
            game.append(primary_info)
            game.append(secondary_info)
            game.append(sale)
            return game
        except game.DoesNotExist:
            return None
     def get(self, request, pk, *args, **kwargs):
        game_instance = self.get_object(pk)
        if not game_instance:
            return Response(
                {"res": "Game with primary key does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer1 = primaryInfoSerializer(game_instance[0])
        serializer2 = secondaryInfoSerializer(game_instance[1])
        serializer3 = saleSerializer(game_instance[2])
        result=serializer1.data.copy()
        print(result)
        result.update(serializer2.data)
        result.update(serializer3.data) 
        return Response(result, status=status.HTTP_200_OK)
     
     def delete(self,request, pk):
        primary_info = get_object_or_404(Primary_info, pk=pk)
        primary_info.delete()
        secondary_info = get_object_or_404(Secondary_info, pk=pk)
        secondary_info.delete()
        sale = get_object_or_404(Sale, pk=pk)
        sale.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

     def put(self,request, pk):
        print(request.data)
        item1 = Primary_info.objects.get(pk=pk)
        data={}
        
        for i in range(3):
            data[list(request.data.keys())[i]]=request.data.get(list(request.data.keys())[i])
            
        data1 = primaryInfoSerializer(instance=item1, data=data)
        data={}
        for i in range(3,7):
            data[list(request.data.keys())[i]]=request.data.get(list(request.data.keys())[i])
            data['id']=pk
        item2 = Secondary_info.objects.get(pk=pk)
        data2 = secondaryInfoSerializer(instance=item2, data=data)
        data={}
        for i in range(7,12):
            data[list(request.data.keys())[i]]=request.data.get(list(request.data.keys())[i])
            data['id']=pk
        item3 = Sale.objects.get(pk=pk)
        data3 = saleSerializer(instance=item3, data=data)
        
        if data1.is_valid() and data2.is_valid() and data3.is_valid():
            data1.save()
            data2.save()
            data3.save()
            results=data1.data.copy()
            print(results)
            results.update(data2.data)
            results.update(data3.data)  
            return Response(results, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
def sort_ranks(request,sale_index):
    category_sale=['-na_sale','-eu_sale','-jp_sale','-other_sale','-global_sale']
    rank_range=list(range(1,len(Sale.objects.all())+1))
    saleObjects = Sale.objects.all().order_by(category_sale[sale_index])
    new_id_order=saleObjects.values('id')
    print(new_id_order)
    primary_info_objects=[]
    secondary_info_objects=[]
    for rank,id in zip(rank_range,new_id_order):
        id_row=int(id.get('id'))
        print(Primary_info.objects.get(pk=id_row))
        primary_info=Primary_info.objects.get(pk=id_row)
        primary_info.rank=rank
        primary_info.save()
        secondary_info=Secondary_info.objects.get(pk=id_row)
        primary_info_objects.append(primary_info)
        secondary_info_objects.append(secondary_info)
            
    serializer1= primaryInfoSerializer(primary_info_objects, many=True)
    serializer2=secondaryInfoSerializer(secondary_info_objects,many=True)
    serializer3=saleSerializer(saleObjects,many=True)
    results=serializer1.data.copy()
    for i in range(len(results)):
        results[i].update(serializer2.data[i])
        results[i].update(serializer3.data[i])    
    return Response(results, status=status.HTTP_200_OK)

class gamesRangeApiView(APIView):
    def delete(self,request, rank,range_used):
        for i in range(range_used):
            try:
                primary_info = Primary_info.objects.get(rank=rank+i)
                secondary_info = Secondary_info.objects.get(pk=primary_info.id)
                sale = Sale.objects.get(pk=primary_info.id)
                primary_info.delete()
                secondary_info.delete()
                sale.delete()
            except primary_info.DoesNotExist or secondary_info.DoesNotExist or sale.DoesNotExist:
                continue
        return Response(status=status.HTTP_202_ACCEPTED)
    
    def get_object(self,rank):
        try:
            primary_info = Primary_info.objects.get(rank=rank)
            secondary_info=Secondary_info.objects.get(pk=primary_info.id)
            sale=Sale.objects.get(pk=primary_info.id)
            game=[]
            game.append(primary_info)
            game.append(secondary_info)
            game.append(sale)
            return game
        except game.DoesNotExist:
            return None
    def get(self, request, rank,range_used):
        instances1=[]
        instances2=[]
        instances3=[]
        for i in range(range_used):
            game_instance = self.get_object(rank+i)
            if not game_instance:
                return Response(
                    {"res": "Game with primary key does not exists"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            instances1.append(game_instance[0])
            instances2.append(game_instance[1])
            instances3.append(game_instance[2])
        serializer1 = primaryInfoSerializer(instances1,many=True)
        serializer2 = secondaryInfoSerializer(instances2,many=True)
        serializer3 = saleSerializer(instances3,many=True)
        results=serializer1.data.copy()
        for i in range(len(results)):
            results[i].update(serializer2.data[i])
            results[i].update(serializer3.data[i])  
        return Response(results, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_by_filter(request,category,index):
    platform_list=list(Secondary_info.objects.order_by().values_list('platform').distinct())
    genres_list=list(Secondary_info.objects.order_by().values_list('genre').distinct())
    year_list=list(Secondary_info.objects.order_by().values_list('year').distinct())
    publisher_list=list(Secondary_info.objects.order_by().values_list('publisher').distinct())
    categories={'platform':None,'genre':None,'year':None,'publisher':None}
    categories['platform']=platform_list
    categories['genre']=genres_list
    categories['year']=year_list
    categories['publisher']=publisher_list
    print(len(categories['platform']),len(categories['genre']),len(categories['year']),len(categories['publisher']))
    if category=="platform":
        filtered=Secondary_info.objects.filter(platform=categories[category][index][0]) 
    elif category=="genre":
        filtered=Secondary_info.objects.filter(genre=categories[category][index][0])
    elif category=="year":
        filtered=Secondary_info.objects.filter(year=categories[category][index][0]) 
    elif category=="publisher":
        filtered=Secondary_info.objects.filter(publisher=categories[category][index][0])  
    all_primary_info=[]
    all_sale=[]
    for id in filtered.values('id'):
         primary_info = Primary_info.objects.get(pk=int(id.get('id')))
         sale = Sale.objects.get(pk=int(id.get('id')))
         all_primary_info.append(primary_info)
         all_sale.append(sale)
    serializer1=primaryInfoSerializer(all_primary_info,many=True)
    serializer2=secondaryInfoSerializer(filtered,many=True)
    serializer3=saleSerializer(all_sale,many=True)
    results=serializer1.data.copy()
    for i in range(len(results)):
        results[i].update(serializer2.data[i])
        results[i].update(serializer3.data[i]) 
    return Response(results,status.HTTP_200_OK)

@api_view(['GET'])
def sort_column_alphabetically(request,column_number,ascending):
    columns=['platform','genres','year','publisher']
    if ascending=='False':
        column='-'+columns[column_number]
    elif ascending=='True':
        column= columns[column_number]
    sorted_secondary_info=Secondary_info.objects.all().order_by(column)
    all_primary_info=[]
    all_sale=[]
    for id in sorted_secondary_info.values('id'):
         primary_info = Primary_info.objects.get(pk=int(id.get('id')))
         sale = Sale.objects.get(pk=int(id.get('id')))
         all_primary_info.append(primary_info)
         all_sale.append(sale)
    serializer1=primaryInfoSerializer(all_primary_info,many=True)
    serializer2=secondaryInfoSerializer(sorted_secondary_info,many=True)
    serializer3=saleSerializer(all_sale,many=True)
    results=serializer1.data.copy()
    for i in range(len(results)):
        results[i].update(serializer2.data[i])
        results[i].update(serializer3.data[i]) 
    return Response(results,status.HTTP_200_OK)