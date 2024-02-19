from django.db import models

# Create your models here.
class Primary_info(models.Model):
    rank=models.IntegerField(null=False,blank=False)
    id=models.IntegerField(null=False,blank=False, primary_key=True)
    name=models.CharField(max_length=256,null=False,blank=False)
    
class Secondary_info(models.Model):
    id=models.IntegerField(null=False,blank=False, primary_key=True)
    platform=models.CharField(max_length=256,null=False,blank=False)
    year=models.CharField(max_length=256,null=False,blank=False)
    genre=models.CharField(max_length=256,null=False,blank=False)
    publisher=models.CharField(max_length=256,null=False,blank=False)

class Sale(models.Model):
    id=models.IntegerField(null=False,blank=False, primary_key=True)
    na_sale=models.FloatField(null=False,blank=False)
    eu_sale=models.FloatField(null=False,blank=False)
    jp_sale=models.FloatField(null=False,blank=False)
    other_sale=models.FloatField(null=False,blank=False)
    global_sale=models.FloatField(null=False,blank=False)
    
    
    
