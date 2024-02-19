from django.test import TestCase
from rest_framework.test import APITestCase
from .serializers import *
from django.contrib.auth.models import User
from .model_factories import *
import json
# Create your tests here.

class PrimaryInfoSerialiserTest(APITestCase):
    PrimaryInfo1=None
    PrimaryInfoSerializer=None

    def setUp(self):
        self.PrimaryInfo1={'rank':1,'id':1,'name':'Wii Sports'}
        self.PrimaryInfoSerializer=primaryInfoSerializer(instance=self.PrimaryInfo1)

    def test_PrimaryInfoSerializerHasCorrectFields(self):
        data=self.PrimaryInfoSerializer.data
        print(data.keys())
        self.assertEqual(set(data.keys()),set(['rank','id','name']))

    def test_PrimaryInfoSerialiserNameIsHasCorrectData(self):
        data = self.PrimaryInfoSerializer.data
        self.assertEqual(data['name'], "Wii Sports")

class SecondaryInfoSerialiserTest(APITestCase):
    SecondaryInfo1=None
    SecondaryInfoSerializer=None

    def setUp(self):
        self.SecondaryInfo1={'id':1,'platform':'Wii','year':2006,'genre':'Sports','publisher':'Nintendo'}
        self.SecondaryInfoSerializer=secondaryInfoSerializer(instance=self.SecondaryInfo1)

    def test_SecondaryInfoSerializerHasCorrectFields(self):
        data=self.SecondaryInfoSerializer.data
        print(data.keys())
        self.assertEqual(set(data.keys()),set(['id','platform','year','genre','publisher']))

    def test_SecondaryInfoSerialiserNameIsHasCorrectData(self):
        data = self.SecondaryInfoSerializer.data
        self.assertEqual(data['platform'], "Wii")

class SaleSerialiserTest(APITestCase):
    Sale1=None
    SaleSerializer=None

    def setUp(self):
        self.Sale1={'id':1,'na_sale':41.49,'eu_sale':29.02,'jp_sale':3.77,'other_sale':8.46,'global_sale':82.74}
        self.SaleSerializer=saleSerializer(instance=self.Sale1)

    def test_SaleSerializerHasCorrectFields(self):
        data=self.SaleSerializer.data
        print(data.keys())
        self.assertEqual(set(data.keys()),set(['id','na_sale','eu_sale','jp_sale','other_sale','global_sale']))

    def test_SaleSerialiserNameIsHasCorrectData(self):
        data = self.SaleSerializer.data
        self.assertEqual(data['na_sale'], 41.49)

class GamesTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(
            username='user',
            email='user@gmail.com',
            password='User123123')
        self.client.force_login(user=self.user)
        self.PrimaryInfo1=PrimaryInfoFactory(rank=1,id=1,name="Mortal Kombat")
        self.PrimaryInfo2=PrimaryInfoFactory(rank=2,id=2,name="Wii Sports")
        self.PrimaryInfo3=PrimaryInfoFactory(rank=3,id=3,name="League of Legends")
        self.PrimaryInfo4=PrimaryInfoFactory(rank=4,id=4,name="Dota 2")
        self.PrimaryInfo5=PrimaryInfoFactory(rank=5,id=5,name="Genshin Impact")
        self.SecondaryInfo1=SecondaryInfoFactory(id=1,platform="PS4",year=2010,genre="Action",publisher="NetherRealm Studios")
        self.SecondaryInfo2=SecondaryInfoFactory(id=2,platform="Wii",year=2007,genre="Sport",publisher="Nintendo")
        self.SecondaryInfo3=SecondaryInfoFactory(id=3,platform="PC",year=2009,genre="Moba",publisher="Riot Games")
        self.SecondaryInfo4=SecondaryInfoFactory(id=4,platform="PC",year=2006,genre="Moba",publisher="Valve Corporation")
        self.SecondaryInfo5=SecondaryInfoFactory(id=5,platform="Mobile",year=2018,genre="RPG",publisher="miHoYo")
        self.Sale1=SaleFactory(id=1,na_sale=41.49,eu_sale=29.02,jp_sale=3.77,other_sale=8.46,global_sale=82.74)
        self.Sale2=SaleFactory(id=2,na_sale=29.08,eu_sale=3.58,jp_sale=6.81,other_sale=0.77,global_sale=40.24)
        self.Sale3=SaleFactory(id=3,na_sale=15.85,eu_sale=12.88,jp_sale=3.79,other_sale=3.31,global_sale=35.82)
        self.Sale4=SaleFactory(id=4,na_sale=15.75,eu_sale=11.01,jp_sale=3.28,other_sale=2.96,global_sale=33)
        self.Sale5=SaleFactory(id=5,na_sale=11.27,eu_sale=8.89,jp_sale=10.22,other_sale=1,global_sale=31.37)
    
    def tearDown(self):
        Primary_info.objects.all().delete()
        Secondary_info.objects.all().delete()
        Sale.objects.all().delete()
    def test_gamesList_get(self):
        response=self.client.get("/games/",format='json')
        print(response)
        self.assertEqual(response.status_code,200)
        data=json.loads(response.content)
        self.assertEqual(len(data),5)
    def test_gameList_post(self):
        
        data={"rank":1, 
              "id":12000,
              "name": "running game", 
              "platform": "windows", 
              "year": '2023', 
              "genre": "arcade", 
              "publisher": "Nintendo", 
              "na_sale":50, 
              "eu_sale":50, 
              "jp_sale":50, 
              "other_sale":50, 
              "global_sale":50
             }
        response=self.client.post('/games/', data=data,format='json')
        self.assertEqual(response.status_code,201)
        data2=json.loads(response.content)
        self.assertEqual(data2,data)
    def test_gamesDetail_get(self):
        response=self.client.get("/games/1/",format='json')
        self.assertEqual(response.status_code,200)
        game1=json.loads(response.content)
        data={"rank":1,"id":1,"name":"Mortal Kombat","platform":"PS4","year":"2010","genre":"Action","publisher":"NetherRealm Studios","na_sale":41.49,"eu_sale":29.02,"jp_sale":3.77,"other_sale":8.46,"global_sale":82.74}
        self.assertEqual(game1,data)
    def test_gamesDetail_delete(self):
        response=self.client.delete("/games/1/",format='json')
        self.assertEqual(response.status_code,202)    
    def test_gamesDetail_put(self):
        data={"rank":50, 
              "id":1,
              "name": "running game", 
              "platform": "windows", 
              "year": '2023', 
              "genre": "arcade", 
              "publisher": "Nintendo", 
              "na_sale":50.0, 
              "eu_sale":50.0, 
              "jp_sale":50.0, 
              "other_sale":50.0, 
              "global_sale":50.0

        }
        response=self.client.put("/games/1/",data=data,format='json')
        self.assertEqual(response.status_code,200)
        data2=json.loads(response.content)
        self.assertEqual(data,data2)  
    def test_sort_ranks(self):
        response=self.client.put("/sort_rank/1",format='json')
        self.assertEqual(response.status_code,200)
        data=json.loads(response.content)
        self.assertGreater(data[0]["eu_sale"],data[1]["eu_sale"])
        self.assertGreater(data[1]["eu_sale"],data[2]["eu_sale"])
        self.assertGreater(data[2]["eu_sale"],data[3]["eu_sale"])
        self.assertGreater(data[3]["eu_sale"],data[4]["eu_sale"])
    def test_games_range_get(self):
        response=self.client.get("/games_range/1/2",format='json')
        self.assertEqual(response.status_code,200)
        data=json.loads(response.content)
        data2=[{'rank': 1, 'id': 1, 'name': 'Mortal Kombat', 'platform': 'PS4', 'year': '2010', 'genre': 'Action', 'publisher': 'NetherRealm Studios', 'na_sale': 41.49, 'eu_sale': 29.02, 'jp_sale': 3.77, 'other_sale': 8.46, 'global_sale': 82.74},
               {'rank': 2, 'id': 2, 'name': 'Wii Sports', 'platform': 'Wii', 'year': '2007', 'genre': 'Sport', 'publisher': 'Nintendo', 'na_sale': 29.08, 'eu_sale': 3.58, 'jp_sale': 6.81, 'other_sale': 0.77, 'global_sale': 40.24}]
        self.assertEqual(data,data2)
    def test_games_range_delete(self):
        response=self.client.delete("/games_range/1/2",format='json')
        self.assertEqual(response.status_code,202)

    def test_get_by_filter(self):
        response=self.client.get("/get_by_filter/platform/2",format='json')
        self.assertEqual(response.status_code,200)
        data=json.loads(response.content)
        self.assertEqual(data[0]["platform"],"PC")
        self.assertEqual(data[1]["platform"],"PC")
    def test_sort_alphabetically(self):
        response=self.client.get("/sort_alphabetically/0/True",format='json')
        self.assertEqual(response.status_code,200)
        data=json.loads(response.content)
        self.assertLessEqual(data[0]["platform"],data[1]["platform"])
        self.assertLessEqual(data[1]["platform"],data[2]["platform"])
        self.assertLessEqual(data[2]["platform"],data[3]["platform"])
        self.assertLessEqual(data[3]["platform"],data[4]["platform"])
