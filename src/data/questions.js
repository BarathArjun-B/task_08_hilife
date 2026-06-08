// Complete Database of 20 Front-End Interview Questions
// Topics: HTML, CSS, JavaScript, React (5 questions each)

export const questions = [
  // --- HTML QUESTIONS (IDs 1-5) ---
  {
    id: 1,
    question: "Which of the following describes the difference between '<script>', '<script async>', and '<script defer>' when loading external scripts?",
    options: [
      "async blocks HTML parsing while downloading; defer downloads in parallel and runs after parsing is complete.",
      "async downloads in parallel and executes immediately (blocking parsing); defer downloads in parallel and executes only after HTML document parsing is complete.",
      "async and defer are identical, but defer only works in older browsers.",
      "async executes scripts in the order they appear; defer executes them as soon as they download."
    ],
    correctAnswer: "async downloads in parallel and executes immediately (blocking parsing); defer downloads in parallel and executes only after HTML document parsing is complete."
  },
  {
    id: 2,
    question: "What is the purpose of the 'srcset' attribute in an '<img>' element?",
    options: [
      "To specify multiple image formats (like WEBP, PNG) for fallback compatibility.",
      "To define a list of image source candidates with their widths or pixel densities, allowing the browser to select the most appropriate image.",
      "To display a sequence of images in a carousel automatically.",
      "To lazy-load images only when they enter the viewport."
    ],
    correctAnswer: "To define a list of image source candidates with their widths or pixel densities, allowing the browser to select the most appropriate image."
  },
  {
    id: 3,
    question: "In HTML5, what is the primary semantic difference between the '<article>' and '<section>' elements?",
    options: [
      "`<article>` is for standalone, distributable, or reusable content, whereas `<section>` represents a thematic grouping of content.",
      "`<article>` must contain a header, while `<section>` cannot contain a header.",
      "`<section>` is inline-level, while `<article>` is block-level.",
      "There is no difference; they are completely interchangeable aliases."
    ],
    correctAnswer: "`<article>` is for standalone, distributable, or reusable content, whereas `<section>` represents a thematic grouping of content."
  },
  {
    id: 4,
    question: "What is the purpose of the HTML5 '<template>' element?",
    options: [
      "To render visual layouts directly to the DOM using predefined CSS styles.",
      "To declare fragments of HTML that are stored in the document but are not rendered or executed until instantiated via JavaScript.",
      "To automatically fetch templates from external APIs.",
      "To construct CSS variables dynamically in HTML."
    ],
    correctAnswer: "To declare fragments of HTML that are stored in the document but are not rendered or executed until instantiated via JavaScript."
  },
  {
    id: 5,
    question: "Which of the following is true regarding 'aria-*' attributes in HTML?",
    options: [
      "They modify the visual appearance of elements for users on mobile devices.",
      "They provide accessibility metadata to screen readers and assistive technologies without altering the document structure or styles.",
      "They are required tags that replace standard HTML form attributes.",
      "They are only used to trigger JavaScript event listeners on interactive components."
    ],
    correctAnswer: "They provide accessibility metadata to screen readers and assistive technologies without altering the document structure or styles."
  },

  // --- CSS QUESTIONS (IDs 6-10) ---
  {
    id: 6,
    question: "In the CSS Grid layout, what is the difference between the 'auto-fill' and 'auto-fit' keywords in the 'repeat()' function?",
    options: [
      "auto-fill stretches the grid tracks to fill all available space, while auto-fit leaves them at their base size.",
      "auto-fill creates new empty tracks if there is space, while auto-fit collapses empty tracks and stretches the filled tracks to occupy the space.",
      "auto-fill only works with rows, whereas auto-fit only works with columns.",
      "auto-fit creates new empty tracks if there is space, while auto-fill collapses empty tracks."
    ],
    correctAnswer: "auto-fill creates new empty tracks if there is space, while auto-fit collapses empty tracks and stretches the filled tracks to occupy the space."
  },
  {
    id: 7,
    question: "What does 'box-sizing: border-box' do in CSS?",
    options: [
      "It adds a default 1px border around the entire HTML document.",
      "It includes padding and border in the element's total width and height, keeping dimensions predictable.",
      "It excludes padding and margin from the width, making the element smaller.",
      "It forces the element to adopt a flexbox-like grid layout."
    ],
    correctAnswer: "It includes padding and border in the element's total width and height, keeping dimensions predictable."
  },
  {
    id: 8,
    question: "Which selector sequence has the HIGHEST specificity in CSS?",
    options: [
      "An inline style attribute (e.g., style='color: red;')",
      "A selector with 1 ID and 3 class selectors (e.g., #header.nav.dark.active)",
      "A selector with 10 class selectors (e.g., .c1.c2.c3.c4.c5.c6.c7.c8.c9.c10)",
      "A selector with 1 ID, 1 class, and 2 element selectors (e.g., #header .nav ul li)"
    ],
    correctAnswer: "An inline style attribute (e.g., style='color: red;')"
  },
  {
    id: 9,
    question: "What is the difference between 'position: absolute' and 'position: fixed'?",
    options: [
      "absolute positions relative to the nearest positioned ancestor; fixed positions relative to the browser viewport.",
      "absolute positions relative to the body; fixed positions relative to the parent container.",
      "fixed elements scroll with the page, whereas absolute elements remain pinned in place.",
      "There is no difference; they both behave identically on desktop browsers."
    ],
    correctAnswer: "absolute positions relative to the nearest positioned ancestor; fixed positions relative to the browser viewport."
  },
  {
    id: 10,
    question: "What is the function of the CSS ':focus-within' pseudo-class?",
    options: [
      "It selects an element if it has a cursor hovering over it.",
      "It selects a parent element if any of its child elements currently have focus.",
      "It matches inputs that are currently displaying a validation error.",
      "It restricts focus to only a single input within a fieldset."
    ],
    correctAnswer: "It selects a parent element if any of its child elements currently have focus."
  },

  // --- JAVASCRIPT QUESTIONS (IDs 11-15) ---
  {
    id: 11,
    question: "What is the difference between microtasks (e.g., Promise callbacks, queueMicrotask) and macrotasks (e.g., setTimeout, setInterval) in JavaScript's Event Loop?",
    options: [
      "Macrotasks have higher priority and run before microtasks in every tick.",
      "Microtasks are executed in the browser background thread, while macrotasks run on the main thread.",
      "The microtask queue is fully emptied before the event loop moves on to the next macrotask or rendering step.",
      "Microtasks only run when the main thread is idle for more than 50ms."
    ],
    correctAnswer: "The microtask queue is fully emptied before the event loop moves on to the next macrotask or rendering step."
  },
  {
    id: 12,
    question: "What is a closure in JavaScript?",
    options: [
      "A method used to close database connections automatically.",
      "The combination of a function bundled together with references to its surrounding state (the lexical environment).",
      "A function that runs immediately upon declaration and cannot access outer variables.",
      "The final step in a try-catch block that executes cleanup code."
    ],
    correctAnswer: "The combination of a function bundled together with references to its surrounding state (the lexical environment)."
  },
  {
    id: 13,
    question: "Which of the following correctly describes 'event delegation' in JavaScript?",
    options: [
      "Assigning multiple event handlers to a single element to trigger different functions.",
      "Attaching a single event listener to a parent element to manage events for all current and future child elements using event bubbling.",
      "Passing an event from the browser tab to a background worker process.",
      "Preventing the default behavior of an element using event.preventDefault()."
    ],
    correctAnswer: "Attaching a single event listener to a parent element to manage events for all current and future child elements using event bubbling."
  },
  {
    id: 14,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "‘==’ compares only object references; ‘===’ compares primitive values.",
      "‘==’ performs type coercion before comparing; ‘===’ compares both value and type without coercion.",
      "‘===’ performs type coercion; ‘==’ does not.",
      "‘===’ is only used for comparing strings and numbers; ‘==’ is for boolean comparisons."
    ],
    correctAnswer: "‘==’ performs type coercion before comparing; ‘===’ compares both value and type without coercion."
  },
  {
    id: 15,
    question: "How do the 'call', 'apply', and 'bind' methods differ when invoking a function with a specific 'this' context?",
    options: [
      "call and apply execute the function immediately (call takes comma-separated arguments, apply takes an array); bind returns a new function with the context bound.",
      "bind executes the function immediately; call and apply delay execution.",
      "apply takes comma-separated arguments, call takes an array, and bind binds the function to window.",
      "They all behave identically and are interchangeable legacy methods."
    ],
    correctAnswer: "call and apply execute the function immediately (call takes comma-separated arguments, apply takes an array); bind returns a new function with the context bound."
  },

  // --- REACT QUESTIONS (IDs 16-20) ---
  {
    id: 16,
    question: "Why must React Hook calls (like useState, useEffect) be placed at the top level of a component and not inside loops, conditions, or nested functions?",
    options: [
      "To prevent memory leaks from running garbage collection too early.",
      "Because React relies on the call order of Hooks to correctly associate state variables with each re-render.",
      "To force hooks to execute on the server side in Server-Side Rendering (SSR).",
      "To compile hooks into standard ES5 functions."
    ],
    correctAnswer: "Because React relies on the call order of Hooks to correctly associate state variables with each re-render."
  },
  {
    id: 17,
    question: "What is the key difference between 'useEffect' and 'useLayoutEffect' in React?",
    options: [
      "useEffect runs synchronously before DOM mutations; useLayoutEffect runs asynchronously after paint.",
      "useEffect runs asynchronously after the browser paints the screen; useLayoutEffect runs synchronously after DOM mutations but before the browser paints.",
      "useEffect only runs on mount; useLayoutEffect runs on every state change.",
      "useLayoutEffect is only for class components; useEffect is for functional components."
    ],
    correctAnswer: "useEffect runs asynchronously after the browser paints the screen; useLayoutEffect runs synchronously after DOM mutations but before the browser paints."
  },
  {
    id: 18,
    question: "In React's Reconciliation process, what is the purpose of the 'key' prop when rendering lists?",
    options: [
      "To apply unique CSS styles to each list element.",
      "To help React identify which items have changed, been added, or been removed, ensuring efficient DOM updates.",
      "To bind click listeners to list items automatically.",
      "To encrypt the component data for secure rendering."
    ],
    correctAnswer: "To help React identify which items have changed, been added, or been removed, ensuring efficient DOM updates."
  },
  {
    id: 19,
    question: "What is the difference between a controlled and an uncontrolled component in React forms?",
    options: [
      "A controlled component uses local component state to drive form inputs; an uncontrolled component relies on the DOM (via refs) to retrieve values.",
      "Controlled components do not support validations; uncontrolled components do.",
      "Uncontrolled components are controlled by React Redux; controlled components are not.",
      "A controlled component is managed by the browser; an uncontrolled component is managed by React."
    ],
    correctAnswer: "A controlled component uses local component state to drive form inputs; an uncontrolled component relies on the DOM (via refs) to retrieve values."
  },
  {
    id: 20,
    question: "Which of the following describes React's Context API?",
    options: [
      "A state management library that replaces local state entirely.",
      "A mechanism to pass data through the component tree without having to pass props down manually at every level.",
      "A system for executing network requests asynchronously in the background.",
      "An API used exclusively to connect React components to external database tables."
    ],
    correctAnswer: "A mechanism to pass data through the component tree without having to pass props down manually at every level."
  }
];
