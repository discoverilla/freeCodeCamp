/* eslint-disable camelcase */
/* This is used for testing. If an intro.json file doesn't match the
 * structure here exactly, the tests will fail.
 */
const introSchema = {
  'responsive-web-design': {
    title: 'Responsive Web Design',
    intro: [
      "In the Responsive Web Design Certification, you'll learn the languages that developers use to build webpages: HTML (Hypertext Markup Language) for content, and CSS (Cascading Style Sheets) for design.",
      "First, you'll build a cat photo app to learn the basics of HTML and CSS. Later, you'll learn modern techniques like CSS variables by building a penguin, and best practices for accessibility by building a web form.",
      "Finally, you'll learn how to make webpages that respond to different screen sizes by building a Twitter card with Flexbox, and a complex blog layout with CSS Grid."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/building_websites_i78t.svg',
    'image-alt': 'Three people designing a responsive website layout together',
    icon:
      'https://cdn3.iconfinder.com/data/icons/seo-web-5-1/128/Vigor_responsive-web-design-adaptive-64.png',
    'icon-alt':
      'A computer monitor with the desktop view and a smartphone with the mobile view of the same website.',
    blocks: {
      'basic-html-and-html5': {
        title: 'Basic HTML and HTML5',
        intro: [
          'HTML is a markup language that uses a special syntax or notation to describe the structure of a webpage to the browser. HTML elements usually have opening and closing tags that surround and give meaning to content. For example, different elements can describe text as a heading, paragraph, or list item.',
          "In this course, you'll build a cat photo app to learn some of the most common HTML elements — the building blocks of any webpage."
        ]
      },
      'basic-css': {
        title: 'Basic CSS',
        intro: [
          'CSS, or Cascading Style Sheets, tell the browser how to display the text and other content that you write in HTML. With CSS, you can control the color, font, size, spacing, and many other aspects of HTML elements.',
          "Now that you've described the structure of your cat photo app, give it some style with CSS."
        ]
      },
      'applied-visual-design': {
        title: 'Applied Visual Design',
        intro: [
          'Visual design is a combination of typography, color theory, graphics, animation, page layout, and more to help deliver your unique message.',
          "In this course, you'll learn how to apply these different elements of visual design to your webpages."
        ]
      },
      'applied-accessibility': {
        title: 'Applied Accessibility',
        intro: [
          'In web development, accessibility refers to web content and a UI (user interface) that can be understood, navigated, and interacted with by a broad audience. This includes people with visual, auditory, mobility, or cognitive disabilities.',
          "In this course, you'll best practices for building webpages that are accessible to everyone."
        ]
      },
      'responsive-web-design-principles': {
        title: 'Responsive Web Design Principles',
        intro: [
          'There are many devices that can access the web, and they come in all shapes and sizes. Responsive web design is the practice of designing flexible websites that can respond to different screen sizes, orientations, and resolutions.',
          "In this course, you'll learn how to use CSS to make your webpages look good, no matter what device they're viewed on."
        ]
      },
      'css-flexbox': {
        title: 'CSS Flexbox',
        intro: [
          "Flexbox is a powerful, well-supported layout method that was introduced with the latest version of CSS, CSS3. With flexbox, it's easy to center elements on the page and create dynamic user interfaces that shrink and expand automatically.",
          "In this course, you'll learn the fundamentals of flexbox and dynamic layouts by building a Twitter card."
        ]
      },
      'css-grid': {
        title: 'CSS Grid',
        intro: [
          'The CSS grid is a newer standard that makes it easy to build complex responsive layouts. It works by turning an HTML element into a grid, and lets you place child elements anywhere within.',
          "In this course, you'll learn the fundamentals of CSS grid by building different complex layouts, including a blog."
        ]
      },
      'responsive-web-design-projects': {
        title: 'Responsive Web Design Projects',
        intro: [
          'Time to put your newly learnt skills to work. By working on projects you would have the opportunity of applying all the skills, principles and concepts you have learnt so far; HTML, CSS, Visual Design, Accessibility, etc.',
          'Complete the five web programming projects below to earn your Responsive Web Design certificate.'
        ]
      },
      'basic-html-cat-photo-app': {
        title: 'Basic HTML Cat Photo App',
        intro: ['placeholder', 'placeholder']
      },
      'basic-css-cafe-menu': {
        title: 'Basic CSS Cafe Menu',
        intro: ['placeholder', 'placeholder']
      },
      'css-variables-skyline': {
        title: 'CSS Variables Skyline',
        intro: ['placeholder', 'placeholder']
      }
    }
  },
  'javascript-algorithms-and-data-structures': {
    title: 'JavaScript Algorithms and Data Structures',
    intro: [
      "While HTML and CSS control the content and styling of a page, JavaScript is used to make it interactive. In the JavaScript Algorithm and Data Structures Certification, you'll learn the fundamentals of JavaScript including variables, arrays, objects, loops, and functions.",
      "Once you have the fundamentals down, you'll apply that knowledge by creating algorithms to manipulate strings, factorialize numbers, and even calculate the orbit of the International Space Station.",
      "Along the way, you'll also learn two important programing styles or paradigms: Object Oriented Programing (OOP), and Functional Programing (FP)."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/dev_focus_b9xo.svg',
    'image-alt': 'A person working on a laptop',
    icon:
      'https://i2.wp.com/info.widespace.com/wp-content/uploads/2016/03/javascript-shield-logo.png?ssl=1',
    'icon-alt': 'JavaScript shield logo',
    blocks: {
      'basic-javascript': {
        title: 'Basic JavaScript',
        intro: [
          'JavaScript is a scripting language you can use to make web pages interactive. It is one of the core technologies of the web, along with HTML and CSS, and is supported by all modern browsers.',
          "In these tutorials, you'll learn fundamental programming concepts in JavaScript. You'll start with basic data types like numbers and strings, then learn to work with arrays, objects, functions, loops, if/else statements, and more."
        ]
      },
      es6: {
        title: 'ES6',
        intro: [
          'ECMAScript, or ES, is a standardized version of JavaScript. Because all major browsers follow this specification, the terms ECMAScript and JavaScript are interchangeable.',
          "Most of the JavaScript you've learned up to this point was in ES5 (ECMAScript 5), which was finalized in 2009. While you can still write programs in ES5, JavaScript is always evolving, and new features are released every year.",
          "ES6, released in 2015, added many powerful new features to the language. In these tutorials, you'll learn these new features, including <code>let</code> and <code>const</code>, arrow functions, classes, promises, and modules."
        ]
      },
      'regular-expressions': {
        title: 'Regular Expressions',
        intro: [
          'Regular expressions, often shortened to regex or regexp, are patterns that help programmers match, search, and replace text. Regular expressions are very powerful, but can be difficult to read because they can use special characters to make more complex, flexible matches.',
          "In these tutorials, you'll learn how to use special characters, capture groups, positive and negative lookaheads, and other techniques to match any text you want."
        ]
      },
      debugging: {
        title: 'Debugging',
        intro: [
          "Debugging is the process of going through your code, finding any issues, and fixing them. Issues in code generally come in three forms: syntax errors that prevent your program from running, runtime errors where your code has unexpected behavior, or logical errors where your code doesn't do what you intended.",
          "In these tutorials, you'll learn how to use the JavaScript console to debug programs, how to prevent common issues before they happen."
        ]
      },
      'basic-data-structures': {
        title: 'Basic Data Structures',
        intro: [
          'Data can be stored and accessed in many ways. You already know some common JavaScript data structures — arrays and objects.',
          "In the Basic Data Structures tutorials, you'll learn more about the differences between arrays and objects, and which to use in different situations. You'll also learn how to use helpful JS methods like <code>splice()</code> and <code>Object.keys()</code> to access and manipulate data."
        ]
      },
      'basic-algorithm-scripting': {
        title: 'Basic Algorithm Scripting',
        intro: [
          'An algorithm is a series of step-by-step instructions that describe how to do something. To write an effective algorithm, it helps to break a problem down into smaller parts, and think carefully about how to solve each part with code.',
          "In these tutorials, you'll learn the fundamentals of algorithmic thinking by writing algorithms that do everything from converting temperatures to handling complex 2D arrays."
        ]
      },
      'object-oriented-programming': {
        title: 'Object Oriented Programming',
        intro: [
          'OOP, or Object Oriented Programming, is one of the major approaches to the software development process. In OOP, objects and classes are used to organize code to describe things and what they can do.',
          "In these tutorials, you'll learn the basic principles of OOP in JavaScript including the <code>this</code> keyword, prototype chains, constructors, and inheritance."
        ]
      },
      'functional-programming': {
        title: 'Functional Programming',
        intro: [
          'Functional Programming is another popular approach to software development. In functional programming, code is organized into smaller, basic functions that can be combined to build complex programs.',
          "In these tutorials, you'll the core concepts of functional programming including pure functions, how to avoid mutations, and how to use methods like <code>.map()</code> and <code>.filter()</code> to write cleaner code."
        ]
      },
      'intermediate-algorithm-scripting': {
        title: 'Intermediate Algorithm Scripting',
        intro: [
          'Now that you know the basics of algorithmic thinking, along with OOP and functional programming, test your skills with the Intermediate Algorithm Scripting challenges.'
        ]
      },
      'javascript-algorithms-and-data-structures-projects': {
        title: 'JavaScript Algorithms and Data Structures Projects',
        intro: [
          "This is it — time to put your new JavaScript skills to work. These projects are similar to the algorithm scripting challenges you've done before, just much more difficult.",
          'Complete these 5 JavaScript projects to earn the JavaScript Algorithms and Data Structures certificate.'
        ]
      },
      'basic-javascript-rpg-game': {
        title: 'Basic JavaScript RPG Game',
        intro: ['placeholder', 'placeholder']
      },
      'intermediate-javascript-calorie-counter': {
        title: 'Intermediate JavaScript Calorie Counter',
        intro: ['placeholder', 'placeholder']
      },
      'functional-programming-spreadsheet': {
        title: 'Functional Programming Spreadsheet',
        intro: ['placeholder', 'placeholder']
      }
    }
  },
  'front-end-libraries': {
    title: 'Front End Development Libraries',
    intro: [
      "Now that you're familiar with HTML, CSS, and JavaScript, level up your skills by learning some of the most popular front end libraries in the industry.",
      "In the Front End Libraries Certification, you'll learn how to style your site quickly with Bootstrap. You'll also learn how add logic to your CSS styles and extend them with Sass. Later, you'll build a shopping cart and other applications to learn how to create powerful Single Page Applications (SPAs) with React and Redux."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/react_y7wq.svg',
    'image-alt': 'A person sitting atop the react logo',
    icon:
      'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-64.png',
    'icon-alt': 'React logo',
    blocks: {
      bootstrap: {
        title: 'Bootstrap',
        intro: [
          'Bootstrap is a front end framework used to design responsive web pages and applications. It takes a mobile-fist approach to web development, and includes pre-built CSS styles and classes, plus some JavaScript functionality.',
          "In these tutorials, you'll learn how to build responsive websites with Bootstrap, and use its included classes to style buttons, images, forms, navigation, and other common elements."
        ]
      },
      jquery: {
        title: 'jQuery',
        intro: [
          'jQuery is one of the most widely used JavaScript libraries in the world. In 2006 when it was released, all major browsers handled JavaScript slightly differently. jQuery simplified the process of writing client-side JavaScript, and also ensured that your code worked the same way in all browsers.',
          "In the following tutorials, you'll learn how to use jQuery to select, remove, clone, and modify different elements on the page."
        ]
      },
      sass: {
        title: 'SASS',
        intro: [
          'Sass, or "Syntactically Awesome StyleSheets", is a language extension of CSS. It adds features that aren\'t available in basic CSS, which make it easier for you to simplify and maintain the style sheets for your projects.',
          "In the Sass tutorials, you'll learn how to store data in variables, nest CSS, create reusable styles with mixins, add logic and loops to your styles, and more."
        ]
      },
      react: {
        title: 'React',
        intro: [
          'React, released by Facebook in 2013, is a popular JavaScript library for building reusable, component-driven user interfaces for web pages or applications. It combines HTML with JavaScript functionality into its own markup language called JSX. React also makes it easy to manage the flow of data throughout the application.',
          "In these tutorials, you'll learn how to create different React components, manage data in the form of state props, use different lifecycle methods like <code>componentDidMount</code>, and much more."
        ]
      },
      redux: {
        title: 'Redux',
        intro: [
          'As applications grow in size and scope, managing shared data becomes much more difficult. Redux is defined as a "predictable state container for JavaScript apps" that helps ensure your apps work predictably, and are easier to test.',
          "While you can use Redux with any view library, it's introduced here before being combined with React in the next set of tutorials.",
          "In the following tutorials, you'll learn the fundamentals of Redux stores, actions, reducers and middleware to manage data throughout your application."
        ]
      },
      'react-and-redux': {
        title: 'React and Redux',
        intro: [
          'React and Redux are often mentioned together, and with good reason. The creator of Redux is part of the React team, and knew how difficult it could be to manage shared data across different components.',
          "Now that you know how to manage the flow of shared data with Redux, it's time to combine that knowledge with React. In the React and Redux tutorials, you'll build a React component and learn how to manage state locally at the component level, and throughout the entire application with Redux."
        ]
      },
      'front-end-libraries-projects': {
        title: 'Front End Development Libraries Projects',
        intro: [
          "It's time to put your front end development libraries skills to the test. Use Bootstrap, jQuery, Sass, React, and Redux to build 5 projects that will test everything you've learned up to this point.",
          "Complete all 5 projects, and you'll earn the Front End Development Libraries certificate."
        ]
      }
    }
  },
  'data-visualization': {
    title: 'Data Visualization',
    intro: [
      "Data is all around us, but it doesn't mean much without shape or context.",
      "In the Data Visualization Certification, you'll build charts, graphs, and maps to present different types of data with the D3.js library.",
      "You'll also learn about JSON (JavaScript Object Notation), and how to work with data online using an API (Application Programing Interface)."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Data_re_80ws.svg',
    'image-alt':
      'Three people placing charts and graphs onto a browser interface',
    icon:
      'https://camo.githubusercontent.com/586ccf0aad9684edc821658cee04146cf36d1f1d5ec904bbefd72728909ccb2e/68747470733a2f2f64336a732e6f72672f6c6f676f2e737667',
    'icon-alt': 'D3 logo',
    blocks: {
      'data-visualization-with-d3': {
        title: 'Data Visualization with D3',
        intro: [
          "D3, or D3.js, stands for Data Driven Documents, and is a JavaScript library to create dynamic and interactive data visualizations in the browser. It's built to work with common web standards, namely HTML, CSS, and Scalable Vector Graphics (SVG).",
          'D3 supports many different kinds of input data formats. Then, using its powerful built-in methods, you can transform that data into different charts, graphs, and maps.',
          "In the Data Visualization with D3 tutorials, you'll learn how to work with data to create different charts, graphs, hover elements, and other things to create dynamic and attractive data visualizations."
        ]
      },
      'json-apis-and-ajax': {
        title: 'JSON APIs and AJAX',
        intro: [
          'Similar to how UIs help people use programs, APIs (Application Programming Interfaces) help programs interact with other programs. APIs are tools that computers use to communicate with one another, in part to send and receive data.',
          'Programmers often use AJAX (Asynchronous JavaScript and XML) when working with APIs. AJAX refers to a group of technologies that make asynchronous requests to a server to transfer data, then load any returned data into the page. And the data transferred between the browser and server is often in a format called JSON (JavaScript Object Notation).',
          'These tutorials will teach you the basics about working with APIs and different AJAX technologies in the browser.'
        ]
      },
      'data-visualization-projects': {
        title: 'Data Visualization Projects',
        intro: [
          'Now that you learned how to work with D3, APIs, and AJAX technologies, put your skills to the test with these 5 Data Visualization projects.',
          "In these projects, you'll need to fetch data and parse a dataset, then use D3 to create different data visualizations. Finish them all to earn your Data Visualization certificate."
        ]
      },
      'd3-dashboard': {
        title: 'D3 Dashboard',
        intro: ['placeholder', 'placeholder']
      }
    }
  },
  'apis-and-microservices': {
    title: 'APIs and Microservices',
    intro: [
      "Until this point, you've only used JavaScript on the front end to add interactivity to a page, solve algorithm challenges, or build an SPA. But JavaScript can also be used on the back end, or server, to build entire web applications.",
      'Today, one of the popular ways to build applications is through microservices, which are small, modular applications that work together to form a larger whole.',
      "In the APIs and Microservices Certification, you'll learn how to write back end-ready with Node.js and npm (Node Package Manager). You'll also build web applications with the Express framework, and build a People Finder microservice with MongoDB and the Mongoose library."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/server_status_5pbv.svg',
    'image-alt': 'A person standing next to a database icon larger than her',
    icon:
      'https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Cloud-Server-Database-Hosting-64.png',
    'icon-alt': 'A server in front of a cloud.',
    blocks: {
      'managing-packages-with-npm': {
        title: 'Managing Packages with NPM',
        intro: [
          "npm (Node Package Manager), is a command line tool to install, create, and share packages of JavaScript code written for Node.js. There are many open source packages available on npm, so before starting a project, take some time to explore so you don't end up recreating the wheel for things like working with dates or fetching data from an API.",
          "In these tutorials, you'll learn the basics of using npm, including how to work with the <code>package.json</code> and how to manage your installed dependencies."
        ]
      },
      'basic-node-and-express': {
        title: 'Basic Node and Express',
        intro: [
          'Node.js is a JavaScript runtime that allows developers to write backend (server-side) programs in JavaScript. Node.js comes with a handful of built-in modules — small, independent programs — that help with this. Some of the core modules include HTTP, which acts like a server, and File System, a module to read and modify files.',
          'In the last set of tutorials you learned to install and manage packages from npm, which are collections of smaller modules. These packages can help you build larger, more complex applications.',
          'Express is a lightweight web application framework, and is one of the most popular packages on npm. Express makes it much easier to create a server and handle routing the routing for your application, which handles things like direct people to the correct page when they visit a certain endpoint like <pre>/blog</pre>.',
          "In these tutorials, you'll learn the basics of Node and Express including how to create a server, serve different files, and handle different requests from the browser."
        ]
      },
      'mongodb-and-mongoose': {
        title: 'MongoDB and Mongoose',
        intro: [
          'MongoDB is a database application that stores JSON documents (or records) that you can use in your application. Unlike SQL, another type of database, Mongo is a non-relational or "NoSQL" database. This means Mongo stores all associated data within one record, instead of storing it across many preset tables as in a SQL database.',
          "Mongoose is a popular npm package that is often installed alongside Mongo. With Mongoose, you can use plain JavaScript objects instead of JSON, which makes it easier to work with Mongo. Also, it allows you to create blueprints for your documents called schemas, so you don't accidentally save the wrong type of data and cause bugs later.",
          "In the MongoDB and Mongoose tutorials, you'll learn the fundamentals of working with persistent data including how to set up a model, and save, delete, and find documents in the database."
        ]
      },
      'apis-and-microservices-projects': {
        title: 'APIs and Microservices Projects',
        intro: [
          "You've worked with APIs before, but now that you know npm, Node, Express, MongoDB, and Mongoose, it's time to build your own. Draw on everything you've learned up to this point to create 5 different microservices, which are smaller applications that are limited in scope.",
          "After creating these, you'll have 5 cool microservice APIs you can show of to friends, family, and potential employers. Oh, and you'll have a shiny new APIs and Microservices certificate, too."
        ]
      }
    }
  },
  'quality-assurance': {
    title: 'Quality Assurance',
    intro: [
      "As your programs or web applications become more complex, you'll want to test them to make sure that new changes don't break their original functionality.",
      "In the Quality Assurance Certification, you'll learn how to write to write tests with Chai to ensure your applications work the way you expect them to.",
      "Then you'll build a chat application to learn advanced Node and Express concepts. You'll also use Pug as a template engine, Passport for authentication, Socket.io for real-time communication between the server and connected clients."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/usability_testing_2xs4.svg',
    'image-alt': 'Two people interacting with a website',
    icon:
      'https://cdn1.iconfinder.com/data/icons/smallicons-misc/32/clipboard-64.png',
    'icon-alt': 'A clipboard with a bulleted list.',
    blocks: {
      'quality-assurance-and-testing-with-chai': {
        title: 'Quality Assurance and Testing with Chai',
        intro: [
          "Chai is a JavaScript testing library that helps you check that your program still behaves the way you expect it to after you make changes. Using Chai, you can write tests that describe your program's requirements and see if your program meets them.",
          "In these tutorials, you'll learn about assertions, deep equality, truthiness, testing APIs, and other fundamentals for testing JavaScript applications."
        ]
      },
      'advanced-node-and-express': {
        title: 'Advanced Node and Express',
        intro: [
          "Now it's time to take a deep dive into Node and Express by building a chat application with a sign in system. To implement the sign in system safely, you'll need to learn about authentication, which is the act of verifying the identity of a person of process.",
          "In these tutorials, you'll learn how to use Passport to manage authentication, Pug to create reusable templates for quickly building the front end, and web sockets for real-time communication between the clients and server."
        ]
      },
      'quality-assurance-projects': {
        title: 'Quality Assurance Projects',
        intro: [
          "Now that you're well versed with both the front end and back end, it's time to apply all the skills and concepts you've learned up to this point. You'll build 5 different web applications, and write tests for each one to make sure they're working and can handle different edge cases.",
          "After completing these Quality Assurance projects, you'll have 5 more projects under your belt, and a new certificate to show off on your portfolio."
        ]
      }
    }
  },
  'scientific-computing-with-python': {
    title: 'Scientific Computing with Python',
    intro: [
      'Python is one of the most popular, flexible programming languages today, and is used for everything from basic scripting to machine learning.',
      "In the Scientific Computing for Python Certification, you'll learn the fundamentals of Python including variables, loops, conditionals, and functions. Then you'll quickly ramp up to complex data structures, networking, relational databases, and data visualization."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/pair_programming_njlp.svg',
    'image-alt': 'Two people sitting in front of a computer',
    icon:
      'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-64.png',
    'icon-alt': 'Python logo',
    blocks: {
      'python-for-everybody': {
        title: 'Python for Everybody',
        intro: [
          'Python for everybody is a free video tutorial series that teach the basics of using Python 3.',
          'The tutorials were created by Dr. Charles Severance (a.k.a. Dr. Chuck). He is a Clinical Professor at the University of Michigan School of Information, where he teaches various technology-oriented courses including programming, database design, and web development.'
        ]
      },
      'scientific-computing-with-python-projects': {
        title: 'Scientific Computing with Python Projects',
        intro: [
          'Time to put your Python skills to the test. By completing these projects, you will demonstrate that you have a good foundational knowledge of Python and qualify for the Scientific Computing with Python certificate.'
        ]
      }
    }
  },
  'data-analysis-with-python': {
    title: 'Data Analysis with Python',
    intro: [
      'Data Analysis has been around for a long time, but up until a few years ago, it was practiced using closed, expensive, and limited tools like Excel or Tableau. Python, SQL, and other open libraries have changed Data Analysis forever.',
      "In the Data Analysis with Python Certification, you'll learn the fundamentals of data analysis with Python. By the end of this certification, you'll know how to read from sources like CSVs and SQL, and use libraries like Numpy, Pandas, Matplotlib, and Seaborn to process and visualize data."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/design_data_khdb.svg',
    'image-alt': 'A person looking at various charts',
    icon:
      'https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Analytics-Graph-Statistics-64.png',
    'icon-alt': 'A line graph',
    blocks: {
      'data-analysis-with-python-course': {
        title: 'Data Analysis with Python',
        intro: [
          'In these comprehensive video tutorials, created by Santiago Basulto from RMOTR, you will learn the whole process of data analysis: reading data from multiple sources (CSVs, SQL, Excel, etc), processing them using NumPy and Pandas, and visualizing them using Matplotlib and Seaborn and clean and process it to create reports.',
          "Additionally, we've included a thorough Jupyter Notebook tutorial, and a quick Python reference to refresh your programming skills."
        ]
      },
      numpy: {
        title: 'Numpy',
        intro: [
          "Learn the basics of the NumPy library in the following video tutorials created by keith Galli. In them, you'll learn how NumPy works and how it compares to Python's built-in lists. You'll also learn how to write code with NumPy, including how to create arrays, indexing, math, statistics, reshaping, and much more."
        ]
      },
      'data-analysis-with-python-projects': {
        title: 'Data Analysis with Python Projects',
        intro: [
          'There are many ways to analyze data with Python. By completing these projects, you will demonstrate that you have a good foundational knowledge of data analysis with Python.',
          'Finish them all to claim your Data Analysis with Python certificate.'
        ]
      }
    }
  },
  'information-security': {
    title: 'Information Security',
    intro: [
      "With everything we do online, there's a vast amount of sensitive information at risk — email addresses, passwords, phone numbers, and much, much more.",
      "With the Information Security Certification, you'll build a secure web app with HelmetJS to learn the fundamentals of protecting people's information online.",
      "You'll also build a TCP client, and an Nmap and port scanner in Python to learn the basics of penetration testing — an important component of good information security, or infosec."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/security_o890.svg',
    'image-alt': 'A person standing in front of a browser with a padlock',
    icon:
      'https://cdn1.iconfinder.com/data/icons/unigrid-phantom-security-vol-1/60/013_005_shield_protect_protection_security_secure_guard_guardian_defense_firewall_5-64.png',
    'icon-alt': 'Green shield logo',
    blocks: {
      'information-security-with-helmetjs': {
        title: 'Information Security with HelmetJS',
        intro: [
          'These programming tutorials focus on HelmetJS, a type of middleware for Express-based applications that automatically sets HTTP headers to prevent sensitive information from unintentionally being passed between the server and client.',
          'Completing the tutorials below will help you understand how to protect your website from malicious behavior.'
        ]
      },
      'python-for-penetration-testing': {
        title: 'Python for Penetration Testing',
        intro: [
          'These video tutorials teach you penetration testing with Python. Also known as a pen test, penetration testing is a simulated attack against a system to check for vulnerabilities.',
          "In these tutorials, you'll learn about sockets, create a TCP server and client, build an Nmap scanner, and other tools and techniques that pen testers use daily."
        ]
      },
      'information-security-projects': {
        title: 'Information Security Projects',
        intro: [
          "Now it’s time to put your new information security skills to work. By developing on these projects, you will have the opportunity to apply all the infosec skills, principles, and concepts you've learned.",
          'When you are done, you will have plenty of information security projects under your belt, along with a certification that you can show off to friends, family, and employers.'
        ]
      }
    }
  },
  'machine-learning-with-python': {
    title: 'Machine Learning with Python',
    intro: [
      'Machine learning has many practical applications you can use in your projects or on the job.',
      "In the Machine Learning with Python Certification, you'll use the TensorFlow framework to build different neural networks, and explore more advanced techniques like natural language processing and reinforcement learning.",
      "You'll also dive into neural networks, and learn the principles behind how deep, recurrent, and convolutional neural networks work."
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Artificial_intelligence_re_enpp.svg',
    'image-alt': 'A person holding a cell phone standing next to a robot',
    icon: 'https://www.kubeflow.org/docs/images/logos/TensorFlow.png',
    'icon-alt': 'TensorFlow logo',
    blocks: {
      tensorflow: {
        title: 'Tensorflow',
        intro: [
          'TensorFlow is an open source framework developed by the Google Brain team aimed to make machine learning and neural networking easier to use.',
          'The following video tutorials were created by Tim Ruscica, also known as “Tech With Tim”. They will help you to understand TensorFlow and some of its powerful capabilities.'
        ]
      },
      'how-neural-networks-work': {
        title: 'How Neural Networks Work',
        intro: [
          "Neural networks are at the core of what we call artificial intelligence today. But historically they've been tough to understand, especially for beginners in the machine learning field.",
          'Even if you are completely new to neural networks, these video tutorials by Brandon Rohrer will get you comfortable with the concepts and the math behind them.'
        ]
      },
      'machine-learning-with-python-projects': {
        title: 'Machine Learning with Python Projects',
        intro: [
          'Machine learning has many practical applications. By completing these free and challenging coding projects, you will demonstrate that you have a good foundational knowledge of machine learning, and qualify for your Machine Learning with Python certificate.'
        ]
      }
    }
  },
  'coding-interview-prep': {
    title: 'Coding Interview Prep',
    intro: [
      "If you're looking for free coding exercises to prepare for your next job interview, we've got you covered.",
      'This section contains hundreds of coding challenges that test your knowledge of algorithms, data structures, and mathematics. It also has a number of take home projects you can use to strengthen your skills, or add to your portfolio.'
    ],
    image:
      'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/software_engineer_lvl5.svg',
    'image-alt':
      'A person sitting at a computer with a data structure in the background',
    icon:
      'https://cdn1.iconfinder.com/data/icons/data-science-flat-1/64/neural-network-machine-learning-algorithm-64.png',
    'icon-alt': 'Algorithm, creative shape icon',
    blocks: {
      algorithms: {
        title: 'Algorithms',
        intro: [
          'These free programming exercises are meant to teach you about some common algorithms that you will likely encounter in real life. They are a great opportunity to improve your logic and programming skills.',
          "These algorithms are frequently used in job interviews to test a candidate's skills. You will be provided clear and concise explanations of how different algorithms work, and expected to implement a solution for each one."
        ]
      },
      'data-structures': {
        title: 'Data Structures',
        intro: [
          'These free programming tutorials are meant to help you deal with large and complex data structures that you may not be familiar with yet.',
          'Working through the tutorials below, you will learn about each type of data structure and implement an algorithm to reinforce your understanding of them.'
        ]
      },
      'take-home-projects': {
        title: 'Take Home Projects',
        intro: [
          "Programming interviews have always been stressful. Job applicants are sometimes given a take home project to be completed outside of the interview. These types of interviews usually require a lot of work, but they're a great way for employers to see how you might perform on the job.",
          'Build the bonus coding projects below for extra practice. Take your time, make them great, and put them on your resume or portfolio to show potential employers.'
        ]
      },
      'rosetta-code': {
        title: 'Rosetta Code',
        intro: [
          'Level up your creative problem solving skills with these free programming tasks from the Rosetta Code library.',
          'These challenges can prove to be difficult, but they will push your algorithm logic to new heights.'
        ]
      },
      'project-euler': {
        title: 'Project Euler',
        intro: [
          'Complete the programming challenges below, from the massive Project Euler archives, to harden your algorithm and mathematics knowledge.',
          'The problems range in difficulty and, for many, the experience is inductive chain learning. That is, by solving one problem it will expose you to a new concept that allows you to undertake a previously inaccessible problem. Can you finish them all?'
        ]
      }
    }
  },
  'misc-text': {
    certification: '{{cert}} Certification',
    'browse-other':
      'Browse our other free certifications\n(we recommend doing these in order)',
    tutorials: 'Tutorials',
    'section-tutorials': '{{section}} Tutorials'
  }
};

exports.introSchema = introSchema;
