package com.idurdyev.torgcrm.jhipster.service.mapper;

import com.idurdyev.torgcrm.jhipster.domain.*;
import com.idurdyev.torgcrm.jhipster.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {ManagerMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "manager.id", target = "managerId")
    TaskDTO toDto(Task task);

    @Mapping(source = "managerId", target = "manager")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
