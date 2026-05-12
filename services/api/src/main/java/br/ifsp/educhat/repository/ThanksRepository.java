package br.ifsp.educhat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.educhat.model.Thanks;

public interface ThanksRepository extends JpaRepository<Thanks, Long> {
    //Page<Task> findAllTasks(int sort, Pageable pageable);
    //Page<Student> findBy(Pageable pageable);
}
