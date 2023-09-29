<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCaZbDsKj3B6T9tp0qGwT40MyFSbqwOM6c",
    authDomain: "jobandseek-46bf8.firebaseapp.com",
    databaseURL: "https://jobandseek-46bf8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jobandseek-46bf8",
    storageBucket: "jobandseek-46bf8.appspot.com",
    messagingSenderId: "920960337873",
    appId: "1:920960337873:web:88d560a6bfb15810b802f0",
    measurementId: "G-8H69H9ENQ9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
