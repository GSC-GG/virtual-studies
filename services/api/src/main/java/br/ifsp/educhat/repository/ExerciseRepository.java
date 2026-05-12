package br.ifsp.educhat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    //Page<Task> findAllTasks(int sort, Pageable pageable);
    //Page<Student> findBy(Pageable pageable);
    Page<Exercise> findByChat(Chat chat, Pageable pageable);
}
