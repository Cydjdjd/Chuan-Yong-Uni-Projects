import factory
from random import randint
from random import choice

from django.test import TestCase
from django.conf import settings
from django.core.files import File

from .models import *


class PrimaryInfoFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Primary_info


class SecondaryInfoFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Secondary_info


class SaleFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Sale
