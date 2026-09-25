from django.db import models


class CompanyInfo(models.Model):
	company_name = models.CharField('Название компании', max_length=150)
	description = models.TextField('Описание')
	logo = models.ImageField('Логотип', upload_to='company/', blank=True, null=True)
	phone = models.CharField('Номер телефона', max_length=30)
	email = models.EmailField('Email')
	address = models.CharField('Адрес', max_length=250)
	instagram_url = models.URLField('Ссылка на Instagram', blank=True)
	telegram_url = models.URLField('Ссылка на Telegram', blank=True)
	vk_url = models.URLField('Ссылка на VK', blank=True)

	class Meta:
		verbose_name = 'Информация о компании'
		verbose_name_plural = 'Информация о компании'

	def __str__(self):
		return self.company_name


class Service(models.Model):
	name = models.CharField('Название услуги', max_length=150)
	description = models.TextField('Описание')
	price = models.DecimalField('Цена', max_digits=10, decimal_places=2)
	image = models.ImageField('Изображение', upload_to='services/', blank=True, null=True)

	class Meta:
		verbose_name = 'Услуга'
		verbose_name_plural = 'Услуги'
		ordering = ['id']

	def __str__(self):
		return self.name
