from django.shortcuts import render

from config.models import CompanyInfo, Service


def site_context():
	return {
		'company': CompanyInfo.objects.first(),
	}


def home(request):
	context = site_context()
	context['services'] = Service.objects.all()[:3]
	return render(request, 'pages/home.html', context)


def about(request):
	return render(request, 'pages/about.html', site_context())


def services(request):
	context = site_context()
	context['services'] = Service.objects.all()
	return render(request, 'pages/services.html', context)


def contacts(request):
	return render(request, 'pages/contacts.html', site_context())
