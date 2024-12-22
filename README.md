# ZeppOS-School Calendar
## Wanna use my app on your own App?

#### Here you have how to do it:

1. First, you will have to acces watch local storage and get the more important data you need.
2. 
   import { LocalStorage } from '@zos/storage'
   var conf = readFile("conf_keySch")
   var jsonBase = readFile('task_keySch')
   function readFile(filename) {
      return localStorage.getItem(filename);
   }
   
  You can do that in that way.
4. Let see now how to askk users task...

```javascript
const tareas = extraerTareas(decodeJSON);
if (conf.new == false) { // user have his app configured?
    for (const asignatura in tareas) {
        if (tareas[asignatura].length > 0) {
            for (const [i, tarea] of tareas[asignatura].entries()) {
                let txt = tarea.substring(0, tarea.indexOf("!")); // Tasks with non important info
            }
        }
    }
}

function extraerTareas(data) {
    const tareasPorAsignatura = {};
    data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura[asignatura.nombre] = asignatura.actividades.tareas;
    });
    return tareasPorAsignatura;
}


   3. Need help?
  
      Ask me by email: flvluju@gmail.com or discord flvluju, I will ask the fast I can.

--------------------------------------------------------------------------------------------------------------------------

## V3. ChangeLog:

#### 1. App official languaje is English.

#### 2. Ported for Zepp OS V3 devices.

#### 3. Fixed some issues and errors

--------------------------------------------------------------------------------------------------------------------------

## V2. ChangeLog:

#### 1. Modify new task screen:

![alt text](assets/image-13.png)

#### 2. Update Exam type task, now you can select which type of exam is: Midterm or final.

![alt text](assets/image-14.png)

#### 3. Update Ejs new task page screen, now you can add until 10 exs for a page.

![alt text](assets/image-15.png)

#### 4. Update Rects´s color on task page screen (Edit button on delete page don´t work for now).

![alt text](assets/image-16.png)

#### 5. Now you can see what task you have on a day in the calendar page (for unknow reasons circles arent showed in my device), click in a day that have a task to see all the task in that day.

![alt text](assets/image-17.png)

#### 6. Filtered task of a day ´s page.

![alt text](assets/image-18.png)


# Enjoy!!!
--------------------------------------------------------------------------------------------------------------------------


# ZeppOS-School Calendar

## V1

## Schedule calendar App for Zepp os users.

For now, app can only be runed on amazfit gts 3, and app´s languaje is Spanish, this will be updated in the future.

This is app interface:

![alt text](assets/image-2.png)

![alt text](assets/image-6.png)

For now in the calendar, you can only see a calendar, in future, a better implementation with task will be added.

![alt text](assets/image-3.png)

In the schhol calendar, you will, be able to see your current day schedule and the other days ones.

How to set your schedule will be explained later...

![alt text](assets/image-5.png)

![alt text](assets/image-4.png)

Swipe to the last page to enter to the new task creation manager.

![alt text](assets/image-7.png)

Click it and here is Interface:

![alt text](assets/image-8.png)

Click on the arrows to change between the subjects (more will be added in the future).

Click on the dots to select the New Task type, after that, you will see this:

![alt text](assets/image-9.png)

This is a new Task, which type is task (avaliable are task, exam and project), so you will have to select the deadline date and which exercises you are asked to make for.

Click in a number to move to the next and change pages´s index and move up and down the date to select one date

When all is good, just press Next button, and you will be redirected into the previous page, in case you want to create another task,

make the previous steps again, else, swipe left to go the last page.

Here is Task manager Page

![alt text](assets/image-10.png)

Touch in a task in order to delete it or see a few more data about it...

![alt text](assets/image-11.png)

In case you dont have task, you will see this:

![alt text](assets/image-12.png)



# How to use

## Requirements

* [Node.js](https://youtu.be/MrJkkG-yt7A?t=23)
* [ZeusCLI](https://docs.zepp.com/docs/guides/tools/cli/#installing-the-zeus-cli)

## Installation process

#### 1. Download the project.

#### 2. Open it.

#### 3. Go to pages sub-folder.

#### 4. Open in edit-mode index.js

#### 5. After opening you will see this:

            const Calendar = [
      ["English", "Technology", "Languaje", "Recreo", "Physics", "History", "Philosophy"],
      ["Maths", "ICT", "Philosophy", "Recreo", "Physics", "History", "English"],
      ["ICT", "History", "Philosophy", "Recreo", "Technology", "Maths", "Languaje", "Physics"],
      ["Languaje", "Maths", "History", "Recreo", "Technology", "ICT", "English"],
      ["English", "Languaje", "Tutoría", "Recreo", "ICT", "Maths", "Physics", "Technology"]
    ]

#### 6. Just put your subjects in each gap, without adding or deleting any one, if there arent no more subjects today just don´t put nothing(this will be added in future)

#### 7. YOU MUSN´T DELETE THE "" AT THE INIT OF EACH SUBJECT, IF YOU DO, PROGRAM WON´T WORK

#### 8. Modifying your subjects time...

#### 9. In next line, you will see this:

    var initsHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
    var endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
    var initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
    var endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]

#### 10. Just modify it according to your needs, I think it is not need to be mentioned how to do it...

#### 11. YOU MUSN´T DELETE THE "" AT THE INIT OF EACH SUBJECT, IF YOU DO, PROGRAM WON´T WORK

#### 12. Save the file and use Zeus Cli tool to see it your watch

App will be more user-friendly in future for now, this is what it is...

ANY SUGGESTION WILL BE GREATLY APPRECIATED.


## Zepp-School-Calendar
