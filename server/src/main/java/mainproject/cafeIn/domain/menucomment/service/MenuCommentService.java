package mainproject.cafeIn.domain.menucomment.service;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.domain.menu.entity.Menu;
import mainproject.cafeIn.domain.menu.service.MenuService;
import mainproject.cafeIn.domain.menucomment.dto.request.MenuCommentRequest;
import mainproject.cafeIn.domain.menucomment.dto.response.MenuCommentResponse;
import mainproject.cafeIn.domain.menucomment.entity.MenuComment;
import mainproject.cafeIn.domain.menucomment.repository.MenuCommentRepository;
import mainproject.cafeIn.global.exception.CustomException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static mainproject.cafeIn.global.exception.ErrorCode.COMMENT_NOT_FOUND;
import static mainproject.cafeIn.global.exception.ErrorCode.INTERNAL_SERVER_ERROR;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuCommentService {
    private final MemberService memberService;
    private final MenuService menuService;
    private final MenuCommentRepository menuCommentRepository;

    @Transactional
    public void createMenuComment(Long loginId, Long menuId, MenuCommentRequest request) {
        Member member = memberService.findById(loginId);
        Menu menu = menuService.findMenuById(menuId);

        Optional<MenuComment> menuComment = findMenuCommentByMemberIdAndMenuId(loginId, menuId);
        if (menuComment.isPresent()) {
            menuComment.get().update(request.getContent());
        } else {
            menuCommentRepository.save(request.toEntity(member, menu));
        }
    }

    @Transactional
    public Long updateMenuComment(Long loginId, Long commentId, MenuCommentRequest request) {
        Member member = memberService.findById(loginId);
        MenuComment menuComment = findMenuCommentById(commentId);
        menuComment.update(request.getContent());

        return menuComment.getMenu().getId();
    }

    @Transactional
    public Long deleteMenuComment(Long loginId, Long commentId) {
        Member member = memberService.findById(loginId);
        MenuComment menuComment = findMenuCommentById(commentId);
        Long menuId = menuComment.getMenu().getId();
        menuCommentRepository.delete(menuComment);

        return menuId;
    }

    public MenuComment findMenuCommentById(Long commentId) {

        return menuCommentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(COMMENT_NOT_FOUND));
    }

    private Optional<MenuComment> findMenuCommentByMemberIdAndMenuId(Long memberId, Long menuId) {

        return menuCommentRepository.findByMemberIdAndMenuId(memberId, menuId);
    }

    public List<MenuCommentResponse> getMenuComments(Long menuId) {

        return menuCommentRepository.getMenuComments(menuId);
    }
}
