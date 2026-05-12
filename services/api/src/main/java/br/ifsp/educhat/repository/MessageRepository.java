package br.ifsp.educhat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByChat(Chat chat, Pageable pageable);
}
