# End Points

## Admin
### Buckets
  ####GET /buckets
    gets all the buckets.
  ####GET /buckets/{bucketId}
    gets a bucket.
  
   ####PUT /buckets
    update the bucket.
   
   ####POST /buckets
     create a new bucket.
     
   ####DELETE /buckets/{bucketId}
    delete bucket by id

### Categories
  ####GET /categories
    gets all the categories.
    
  ####GET /categories/active
    gets all active categories.
  
   ####GET /categories/{categoryId}
    get the specific category.
  
   ####PUT /categories/{categoryId}
    update specific category.
   
   ####POST /category
    create a new category.
     
   ####DELETE /category/{categoryId}
    delete category by id
  
### Questions
  ####GET /questions/bucket/{bucketId}
    gets all the questions by bucket id.
    
  ####POST /questions
    add new question.
  
   ####PUT /questions/{questionId}
    updates the specific question
  
   ####PUT /questions/{questionId}/deactivate
    deactiave the question.
   
   ####PUT /questions/{questionId}/activate
    activate the question
     
   ####DELETE /questions/{questionId}
    delete question by id
  
  
### SkillType
  ####GET /skillTypes
    find all skill types.
    
  ####GET /skillTypes/active
    find all active skill types.
    
  ####GET /skillTypes/{skillTypeId}
    find skill types by id.
    
  ####GET /skillTypes/{skillTypeName}
    find skill types by name.
    
  ####POST /skillTypes
    save skill type
  
   ####PUT /skillTypes/{skillTypeId}
    updates specific skill type
     
   ####DELETE /skillTypes/{skillTypeId}
    delete skill type by id

# Screening
