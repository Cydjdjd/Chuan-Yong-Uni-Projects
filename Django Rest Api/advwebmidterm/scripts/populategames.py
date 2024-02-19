from games.models import *
import csv


def run():
    with open("C:/Users/ASUS/OneDrive - SIM - Singapore Institute of Management/Desktop/Adv Web/Adv Web Mid term/advwebmidterm/scripts/vgsales.csv") as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        Primary_info.objects.all().delete()
        primary_info_rows = {}
        Secondary_info.objects.all().delete()
        secondary_info_rows = {}
        Sale.objects.all().delete()
        sale_info_rows = {}
        Id=1
        for row in reader:

            print(row)
            primary_info = Primary_info.objects.create(rank=row[0],
                        id=Id,
                        name=row[1],
                        )
            primary_info.save()
            primary_info_rows[Id]=row

            secondary_info = Secondary_info.objects.create(
                        id=Id,
                        platform=row[2],
                        year=row[3],
                        genre= row[4],
                        publisher=row[5],
                        )
            secondary_info.save()
            secondary_info_rows[Id]=row
            sale = Sale.objects.create(
                        id=Id,
                        na_sale=row[6],
                        eu_sale=row[7],
                        jp_sale=row[8],
                        other_sale=row[9],
                        global_sale=row[10]
                        )
            sale.save()
            sale_info_rows[Id]=row
            Id+=1