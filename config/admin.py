from django.contrib import admin

from .models import CompanyInfo, Service


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
	list_display = ('company_name', 'phone', 'email', 'address')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
	list_display = ('name', 'price')
	search_fields = ('name', 'description')
