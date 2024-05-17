package com.CodeSquad.IssueTracker.labels;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
    Optional<Label> findByLabelName(String labelName);
}