package co.com.sofka.crud.Controller;

import co.com.sofka.crud.Model.TodoDTO;
import co.com.sofka.crud.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/todo")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping("/all")
    public ResponseEntity<List<TodoDTO>> getAllUsers() {
        List<TodoDTO> listOfAllUsers = service.getAllTodos();
        return new ResponseEntity<List<TodoDTO>>(listOfAllUsers, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<TodoDTO> saveUser(@RequestBody TodoDTO user) {
        TodoDTO addUser = service.saveTodo(user);
        return new ResponseEntity<TodoDTO>(addUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TodoDTO> updateUser(@RequestBody TodoDTO user) {
        TodoDTO userUpdated = service.saveTodo(user);
        return new ResponseEntity<TodoDTO>(userUpdated,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUserById(@PathVariable Long id) {
        service.deleteTodoById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDTO> getUserById(@PathVariable Long id) {
        TodoDTO userRetrieved = service.getTodoById(id);
        return new ResponseEntity<TodoDTO>(userRetrieved,HttpStatus.OK);
    }

}
