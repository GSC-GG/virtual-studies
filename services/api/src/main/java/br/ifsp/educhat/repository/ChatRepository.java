package br.ifsp.educhat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.model.User;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Page<Chat> findByTeacher(Teacher teacher, Pageable pageable);
    Page<Chat> findByStudentsContaining(Student student, Pageable pageable);
}
