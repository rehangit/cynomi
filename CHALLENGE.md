# Cynomi Fullstack Technical Task

Create a web application using React and Typescript

## Requirements

1. One page should contain a form, where users can fill the following information:

   ```
   Name, Gender, Sleep time duration.
   ```

   This data should be added into the DB when you should add additional column current date in format yyyy-mm-dd.

   For example: `John, Male, 8,2021-04-21` (John slept 8 hours ant 2021-04-21)

2. The second page should have 2 items:

   - A Table with the data from the previous form. It should contain:

     Name, Gender, number of rows per this specific person.

     For example: `John, Male, 10` - it means John filled the form 10 times

   - A Bar Chart.

     In case if any row in table will be pressed, the bar chart should display the data of this person for the last 7 days:

     Y: Sleep time duration

     X: Date

     In such a way we can see how John slept during the last 7 days

3. For bar chart please use Apache echart: http://echarts.apache.org/en/index.html.

## Submission

Please provide a Github link to your code and any instructions necessary to run the application locally. Additionally, please provide screenshots of the running app as it works for you.

Please provide your original time estimate for the test + how much time it took in practice.
