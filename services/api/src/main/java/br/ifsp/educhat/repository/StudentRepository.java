package br.ifsp.educhat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Page<Student> findByChatsContaining(Chat chat, Pageable pageable);
}
