package mainproject.cafeIn.domain.postbookmark.repository;

import mainproject.cafeIn.domain.postbookmark.entity.PostBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostBookmarkRepository extends JpaRepository<PostBookmark, Long> {
    Optional<PostBookmark> findByMemberIdAndPostPostId(Long memberId, Long postId);
}

