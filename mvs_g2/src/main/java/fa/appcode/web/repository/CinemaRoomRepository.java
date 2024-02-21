package fa.appcode.web.repository;

import fa.appcode.web.entities.CinemaRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CinemaRoomRepository extends JpaRepository<CinemaRoom,Integer> {
    @Query(value = "select c from CinemaRoom c where c.roomName like %?1%",
            countQuery = "select count(p) from CinemaRoom p where p.roomName like %?1%"
    )
    Page<CinemaRoom> findByRoomNameLike(String key, Pageable pageable);
}
