# Site Title

![image of site](link to image) - use an image from AmIResponsive that shows the site on multiple devices

## Introduction

This is the frontend of the project GreenThumb Hub. You can find the backend repository [here](https://github.com/FridaWikell/greenthumb-backend).

The project is about creating a social media, a hub, for all gardeners. The purpose is to show other green fingered fellows how your garden is progressing, to ask for advice and questions or just have a fun time and find new friends with the same hobby as yourself.

## Table of Contents

## User Experience

### User Goals

The user goal is to be able to share the interest and hobby with other green fingered people. They should be able to communicate and learn from each others knowledge.

### Site Owner Goals

The site owner goal is to provide a place where the green fingers can grow and crack in bloom.

### User Stories

A total of four epics and nine user stories were created. Two of the user stories were classified as "won't have" and haven't been fulfilled or worked at in this iteration. To view all epics and user stories for the frontend are collected at a project board [here](https://github.com/users/FridaWikell/projects/8).

All user stories are labeled with must have, should have, could have or won't have, depending on prioritization according to MoSCoW prioritization. Each of all user stories are also labeled with a point. The point is an estimate in how long time it will take to finish the acceptance criterias in the user story. All acceptance criterias are presented in each user story at the project board.

| Class | Points | Percentage of total points |
| -------- | ----- | ------------------------ |
| Must have | 8 p | 17 % |
| Should have | 4 p | 8 % |
| Could have | 8 p | 17 % |
| Won't have | 28 p | 58 % |

#### [Epic - Content creation and interaction](https://github.com/FridaWikell/greenthumb-front/issues/1)

As a user, I would like to upload posts and interact with other users' content, so that I can share my gardening experiences and learn from the community.

**User Story - Upload posts**

As a user, I would like to upload posts and attach images, so that I can share my gardening experiences with the community.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user is logged in and navigates to the post creation page  
When they enter text and attach images  
Then the post is published to their profile and visible in their followers' feeds and main feed  
- Acceptance Criteria 2  
Given a user attempts to submit a post without filling out all required fields  
When they press the submit button  
Then they are notified which required fields need to be filled out before the post can be published  

**User Story - Edit and delete posts**

As a user, I would like to edit and delete my own posts, so that I can manage my shared content.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user is viewing a post they have created  
When they select the option to edit the post and submit the changes  
Then the post is updated with the new content  
- Acceptance Criteria 2  
Given a user is viewing a post they have created  
When they select the option to delete the post  
Then the post is removed from the platform and their profile  

**User Story - Comment on posts**

As a user, I would like to comment on posts, so that I can engage in discussions and share my thoughts or advice with the community.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user is logged in and viewing a post  
When they submit a comment on the post  
Then their comment is displayed under the post for others to see  
- Acceptance Criteria 2  
Given a user is not logged in  
When they attempt to submit a comment on a post  
Then their comment is not posted  

**User Story - Edit and delete comments**

As a user, I would like to edit and delete my comments on posts, so that I can correct mistakes or remove comments I no longer wish to share.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user is viewing their own comment on a post  
When they select the option to edit the comment and submit the changes  
Then the comment is updated with the new content  
- Acceptance Criteria 2  
Given a user is viewing their own comment on a post  
When they select the option to delete the comment  
Then the comment is removed from the post  
- Acceptance Criteria 3  
Given a user is viewing a comment on a post  
When they are not the author of the comment and attempt to edit or delete it  
Then the system denies the action  

#### [Epic - Community engagement](https://github.com/FridaWikell/greenthumb-front/issues/7)

**User Story - Ask questions**

As a user, I would like to ask questions with options for answers, so that I can get advice on specific gardening dilemmas.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user has a question about gardening  
When they post the question with predefined answer choices  
Then other users can vote on the options, providing the asker with community feedback  
- Acceptance Criteria 2  
Given a user has asked a question with options for answers  
When the user wants to see how other people have answered  
Then the results are displayed  
- Acceptance Criteria 3  
Given a user is not logged in  
When they attempt to create a question or vote on an existing question  
Then it is not registered  

#### [Epic - Content discovery](https://github.com/FridaWikell/greenthumb-front/issues/10)

**User Story - Search content**

As a user, I would like to search the platform, so that I can discover content that matches my gardening interests.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user is looking for specific gardening content  
When they use the search function with keywords  
Then they are presented with content relevant to their search criteria  
- Acceptance Criteria 2  
Given a user enters a search term that yields no results  
When they submit the search  
Then they are informed that no results were found and suggested to refine their search terms  

#### [Epic - Cross-device compatibility and accessibility](https://github.com/FridaWikell/greenthumb-front/issues/12)

As a site owner, I want the platform to be accessible and fully functional across all devices, so that users can seamlessly engage with the community, regardless of how they access the site.

**User Story - Ensuring responsive design for multiple devices**

As a site owner, I would like to ensure the platform is fully responsive and provides a seamless experience across all devices, so that users can engage with the community whether they are on a desktop, tablet, or smartphone.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user accesses the platform from a mobile device  
When they navigate through the site and interact with its features  
Then the layout, text, and interactive elements adjust to provide an optimal viewing and interaction experience on a smaller screen  
- Acceptance Criteria 2  
Given a user switches between devices to access the platform  
When they resume their activity on a different device  
Then they experience consistent functionality and aesthetics, ensuring engagement continuity regardless of the device used  

**User Story - Accessibility compliance**

As a site owner, I would like the platform to meet accessibility standards, so that users with disabilities can also seamlessly engage with the community.

Acceptance Criteria:

- Acceptance Criteria 1  
Given a user with visual impairments uses screen reading software to access the platform  
When they navigate through the site  
Then all content is accessible via the screen reader, with all images having alt text and all actionable items being screen-reader friendly  

## Design
### Colour Scheme
### Typography
### Imagery
### Wireframes

## Features

### Feature title - e.g. Navigation
Screenshot of implemented feature
Description of the value this feature has for the users

Repeat for each feature

## Features to be Added
Describe some additional features you could potentially add to the project that would increase user value - could be things linked to technologies not yet covered by the course but would be a benefit to the user for example, the ability to save an article, or add an article to the site, leave a review.


## Testing

### Validation of Code
Insert screenshots of HTML, CSS and any other code files being tested in the relevant code validator - CSS validator might not validate newer CSS syntax - be careful to read and fully understand why it is giving you an error.

### Lighthouse
You can perform a test of your website for performance, accessibility, best practices and SEO through the google chrome lighthouse test - it is in your Dev tools. Bear in mind that your internet connection speed plays a part in the performance figures obtained. Where it scores low, it will give you suggestions on how to improve the site - read the suggestions and think about how to implement them - it could be a good idea.
Do this for both Desktop and Mobile.

### Wave Webaim - accessibility testing
You can test your site for accessibility through the wave.webaim site - it needs to be deployed in order for it to test it. Fix any errors that it gives

### Manual Testing

You need to perform, and document everything you did to manually test your site.
At a minimum - you need to check every link on every page works as intended.
So that is check every link in the nav bar (do this on every single page because its a link in a different file) and any other links that appear on your site.
Test the responsiveness of the site - you can do this in the dev tools in responsive mode.
You should also load the site once deployed on as many devices you have access to. What is different from one device to the next? why is it different?

Test the user stories that you created earlier in the readme - did you satisfy the goal, how?

To write up the tests you can use a table,
| Feature being tested | Expected Outcome | Testing Performed | Actual Outcome | Result (Pass or fail) |
| -------------------- | ---------------- | ----------------- | -------------- | --------------------- |
| enter details here | enter details here | enter details here | enter details here | enter details here |

You should have tests for every section of every page.. individually.

## Technologies Used

Detail what technologies you used. So what code languages, what frameworks, libraries, what software did you use to develop the site - Balsamic for your wireframes, Figma for a mockup?

## Deployment

Detail how to clone the repository, how to fork the repository - how to run the site locally and how to deploy it.


## Credits

You need to credit where you got anything for your site from.. where are the images from, are they all from the same site? where did you get the content from, if you wrote it yourself, did you fact check anywhere? did you get code from anywhere? if so, it needs to be clearly marked in both the code and the readme.

## Acknowledgements
Any special acknowledgements you'd like to leave

Back to top link to return to the top of the readme.

| Follow user - button change | When the follow button is pressed, it changes to become an unfollow button | Find a user, press follow and watch the button content change |
| Unfollow user | When the unfollow button is pressed, the user is unfollowed and its post isn’t visible in “plant friends” | Find a user, press unfollow and view to be sure its posts aren’t visible in plant friends | 
| Unfollow user - button change | When the unfollow button is pressed, it changes to become a follow button | Find a user, press unfollow and watch the button content change |