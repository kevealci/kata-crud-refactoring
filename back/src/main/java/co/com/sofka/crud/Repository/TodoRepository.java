package co.com.sofka.crud.Repository;

import co.com.sofka.crud.Model.TodoDTO;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<TodoDTO, Long> {
}
