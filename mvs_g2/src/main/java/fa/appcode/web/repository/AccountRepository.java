package fa.appcode.web.repository;

import fa.appcode.web.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {
    @Query(value = "select c from Account c where c.username=:account")
    Account getByUsername(String account);
}
