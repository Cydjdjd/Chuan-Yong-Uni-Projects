from rest_framework import serializers
from .models import Primary_info
from .models import Secondary_info
from .models import Sale


class primaryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Primary_info
        fields = ["rank", "id", "name"]

class secondaryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secondary_info
        fields = ["id","platform", "year","genre","publisher"]

class saleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ["id","na_sale","eu_sale","jp_sale","other_sale","global_sale"]

