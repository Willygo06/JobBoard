
## Installation

Install the jobboard with npm

```bash
  npm install jobboard-project
  cd jobboard
```
    
# Project Title

**Welcome to the Job Board project led by Clément Lores and Wilfried Gomes Fortes. Students at Epitech Nice.**

In a world where job searching often resembles a true obstacle course for millions of candidates, two friends decided to make a change. Inspired by their own frustrating experiences, they envisioned a platform that would simplify the recruitment process. They called it LFG.

LFG is much more than just a job listing site; it’s a friendly and intuitive space dedicated to posting job opportunities. With LFG, every candidate can create a unique profile, discover opportunities that match their skills, and apply in the blink of an eye. Their mission? To make job searching more accessible and enjoyable, transforming this quest into an enriching adventure.




![Logo](https://pbs.twimg.com/profile_images/1671247989455683585/SGKA_txr_400x400.jpg)


## Description

**Candidate Area:** Users can create their profile and apply for job listings.

**Admin Area:** Administrators can post job listings and manage companies and applications.

**Easy Application:** You can apply for job listings in just a few clicks.## Color Reference

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Color | ![#000000](https://via.placeholder.com/10/0a192f?text=+) Black |
|  Color | ![#ffffff](https://via.placeholder.com/10/f8f8f8?text=+) White |



## Technologies Used

 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
    
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)



**Notification:** React-Toastify 

**Password Security :** Bcrypt and Regex



## App.js

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './elements/header';
import JobBoard from './jobboard';
import Footer from './elements/footer';
import BackToTop from './elements/backtotopbutton';
import AdminPage from './admin/Dashboard';
import { AuthProvider } from './contexts/AuthContext'; 
import MyAccount from './elements/MyAccount';
import MyApplications from './elements/MyApplications';


function App() {
  return (
    <AuthProvider> 
      <Router> 
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
            
              <Route path="/" element={<JobBoard />} />
                          
              <Route path="/admin/dashboard" element={<AdminPage />} />

              <Route path="/people/me" element={<MyAccount />} />

              <Route path="/applications/me" element={<MyApplications />} />
              
            </Routes>
          </div>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
````

## API Reference

#### Post 


|   Route  | Method |      Description         |
| :------- | :----- | :----------------------- |
| `People` | `Post` | Create Candidate Account |

```javascript
const newPerson = await prisma.people.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        address,
        zipcode,
        role: role || "user", // Définit le rôle par défaut à 'user'
      },
    });
    
 res.status(201).json({ result: true, person: newPerson });
  } catch (error) {
    console.error("Erreur lors de la création de la personne:", error);
````


#### Get 

|      Route      | Method |      Description         |
| :-------------- | :----- | :----------------------- |
| `Advertisement` |  `Get` |  Fetch all job postings  |

```javascript
 try {
    const advertisements = await prisma.advertisements.findMany({
      include: {
        applications: true, // Inclure les candidatures liées
        company: true, // Inclure les entreprises liées
      },
    });
    res.json(advertisements);
  } catch (error) {
    next({
      message: "Erreur lors de la récupération des annonces.",
      details: error.message,
    });
  }
});

````

#### Put 

|      Route      | Method |      Description         |
| :-------------- | :----- | :----------------------- |
|  `Application`  |  `Put` |   Edit an application    |

```javascript
 const { id } = req.params;
  const { jobId, applicantId, message, state } = req.body;
  try {
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: {
        jobId,
        applicantId,
        message,
        state,
      },
    });
    res.json(updatedApplication);
  } catch (error) {
    next({ message: 'Erreur lors de la mise à jour de la candidature.', details: error.message });
  }
});

````

#### Delete

|    Route    |  Method  |    Description       |
| :---------- | :------- | :------------------- |
|  `company`  | `Delete` |    Delete a company  |

```javascript
  const { id } = req.params;
  try {
    await prisma.advertisements.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({
      message: "Erreur lors de la suppression de l'annonce.",
      details: error.message,
    });
  }
});

````



## Run Locally

Clone the project

```bash
  git clone git@github.com:Willygo06/JobBoard.git
```

Go to the project directory

```bash
  cd Jobboard
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```

Start the Database

```bash
  npx prisma studio
```

Start the frontend

```bash
  npm start
```


## Documentation

[Prisma](https://www.prisma.io/)

[TailwindCSS](https://tailwindcss.com/)

[MDN Web Docs](https://developer.mozilla.org/fr/)




## Authors

- [@ClémentLores](https://github.com/Klemso)
- [@WilfriedGomesFortes](https://github.com/Willygo06)



## 🔗 Links
[![Clément Lores](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cl%C3%A9ment-lores-72b3a319a/)

[![wilfried](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilfried-gomes-fortes-610575326/)



## License

[MIT](https://choosealicense.com/licenses/mit/)

