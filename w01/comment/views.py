from django.shortcuts import redirect
from comment.models import Comment
from diary.models import Content
from loginpage.models import Member
from django.utils.timezone import now
from django.urls import reverse

def add_comment(request, cno):
    if request.method == "POST":
        # 세션에서 현재 로그인한 사용자 정보 가져오기
        session_id = request.session.get('session_id')
        if not session_id:
            return redirect('/loginpage/login/')  # 로그인 페이지로 리다이렉트

        member = Member.objects.filter(id=session_id).first()
        if not member:
            return redirect('/loginpage/login/')

        # 연결된 게시글 가져오기
        content = Content.objects.filter(cno=cno).first()
        # if not content:
        #     return redirect('diary_view')  # 게시글 목록 페이지로 리다이렉트

        # 폼에서 입력된 댓글 내용 가져오기
        text = request.POST.get('comment_text', '').strip()
        if text:
            # 댓글 저장
            Comment.objects.create(
                content=content,
                member=member,
                text=text,
                created_at=now(),
                updated_at=now(),
            )

        # 댓글 작성 후 원래 페이지로 리다이렉트
        # 저장 후 페이지 새로고침
        # 댓글 작성 후 원래 게시글 페이지로 리다이렉트, comment_success 파라미터 추가
        # return redirect(f'{reverse("diary:diary_view", args=[cno])}?comment_success=true')
        return redirect(reverse('diary:diary_view', kwargs={'cno': cno}) + '?comment_success=true')
        # return redirect(f'/diary/diary_view/{cno}/?comment_success=true')


