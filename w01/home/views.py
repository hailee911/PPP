from django.shortcuts import render, redirect
from loginpage.models import Member
from diary.models import Content
from customer.models import NoticeBoard
from django.http import JsonResponse,HttpResponse
from django.db.models import Q


# 랜딩페이지
def landing(request):
  return render(request,'landing.html')

def main(request):
  qs_post = NoticeBoard.objects.filter(category=2).order_by('-bno')
  context = {'post_lists':qs_post}
  return render(request, 'main.html', context)

def logout(request):
  request.session.clear()
  return redirect('/')

# 검색창
def search(request):
  id = request.session['session_id']
  csearch = request.POST.get("csearch")
  print("csearch : ",csearch)
  member = Member.objects.get(id=id)
  qs = list(Content.objects.filter(Q(member=member,ctitle__contains=csearch)|Q(member=member,ccontent__contains=csearch) ).values())
  print("qs : ",qs)
  context = {"list_qs":qs}
  return JsonResponse(context)

# 우리가족 그래프
def get_family_members(request):
    id = request.session['session_id']
    qs = Member.objects.filter(id=id).first()

    my_cdi = qs.created_group.gno
    my_jdi = qs.joined_group.gno

    print('나오나요',my_cdi,my_jdi)
    # 가족 구성원의 이름을 가져옵니다.
    family_members = Member.objects.all()
    data = [{'id': member.id, 'name': member.name} for member in family_members]
    return JsonResponse(data, safe=False)