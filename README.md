# Questions and Answers Platform

Questions and Answers Platform is a web application that integrates Drupal for content management and React for a dynamic, responsive user interface. This project allows users to browse and filter questions and answers by various programming languages, providing an intuitive and interactive experience.

## Key Features

- **Dynamic Question and Answer Display:** Browse questions and answers categorized by programming languages such as Java, C#, PHP, and Drupal.
- **Interactive UI:** Clicking on a question reveals the answer. Clicking the same question again closes the answer. Clicking on a different question will close the previous answer and open the newly selected one, ensuring a clean interface.
- **Drupal Integration:** Data is managed in Drupal with a custom content type for questions and answers, and a view to manage and filter the content sent to React.
- **Category Filtering:** Users can filter questions based on the selected programming language category from the top banners.

## Technologies

- **Frontend:** React, CSS for styling.
- **Backend:** Drupal 10 with a custom content type and views.

## Content Structure in Drupal

**Content Type: Question**
- **Title:** Field for the question.
- **Answer (Body):** Field for the answer.
- **Topic:** Taxonomy reference field to tags.
- **Order:** Utilizes the Weight module for ordering questions.
- **Views:** View displaying JSON of the fields for questions and answers, including Order and Topic.

## Screenshots

**User Views:**
- **Home Screen:**
  ![image](https://github.com/user-attachments/assets/fc833b91-874f-4a1c-a43a-21fb33f10a21)
  Displays top banners for selecting programming language categories.
- **Question Display:**
  ![image](https://github.com/user-attachments/assets/80a16159-103f-4d5b-974e-4d5a8b6bd5ea)
   Questions are displayed one after the other. Clicking on a question reveals the answer, while clicking on another question closes the previous one.

## Conclusion

Questions and Answers Platform provides a seamless integration of Drupal and React, offering a powerful and user-friendly solution for managing and displaying categorized questions and answers. With its interactive UI and robust backend, it ensures an engaging experience for users seeking information in specific programming languages.
