<script setup>
import {ref, onMounted, computed} from "vue";
import apiService from "@/apiClient/apiService";

    const articles = ref([]);
    const pageSize = ref(4);
    const currentPage = ref(1);

    // Calculate the starting index for the current page
    const start = computed(() => (currentPage.value - 1) * pageSize.value);

    // Use a computed property to get a slice of articles for the current page
    const paginatedArticles = computed(() => {return articles.value.slice(start.value, start.value + pageSize.value);});


    //onMounted(fetchArticles);
    onMounted(function() {
      fetchArticles();
      console.log('pageSize:', pageSize.value, 'currentPage:', currentPage.value);
    })

    async function fetchArticles() {
      const response = await apiService.getNews();
      articles.value = response.data.articles;
      console.log("Filled with", articles.value)
    }

    function formatDate(dateString) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(dateString)
      const formattedDate = date.toISOString().split('T')[0]
      const dayOfWeek = daysOfWeek[date.getDay()]
      return `${formattedDate}, ${dayOfWeek}`;
    }

    function previousPage() {
      if(currentPage.value > 1) {
        currentPage.value--
      }
    }

    function nextPage() {
      if(currentPage.value * pageSize.value < articles.value.length) {
        currentPage.value++
      }
    }

    function handlePageSizeChange() {
      if(pageSize.value === '99') {
        currentPage.value = 1
      }
    }
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <h1>News</h1>
    </div>
    <div class="body">
      <div class="content">
        <div class="article" v-for="article in paginatedArticles" onclick="location.href=article.url">
          <p class="title">{{article.title}}</p>
          <p class="description">{{article.description}}</p>
          <p class="name">{{article.name}}</p>
          <p class="publish">{{formatDate(article.publishedAt)}}</p>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= articles.length">Next</button>
        <label for="artikel" class="amount-article">Show Articles</label>
        <select name="Artikel" id="artikel" v-model="pageSize" @change="handlePageSizeChange">
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="99">All</option>
        </select>
      </div>

    </div>
  </div>
</template>

<style scoped>
.wrapper {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 5px 5px 0 0;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.body {
  padding: 20px;
}

.content {
  color: #333;
}

.article {
  padding: 15px; /* Add padding for separation and a "box" effect */
  margin-bottom: 15px; /* Add spacing between articles */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  border-left: 5px solid #007bff; /* Add a colored border on the left */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow effect */
  height: 150px; /* Set a shorter fixed height for consistent layout */
  overflow: hidden; /* Hide overflow content */
}

.title {
  font-size: 20px;
  color: #000;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #444;
  margin-bottom: 5px;
}

.name {
  font-style: italic;
  color: #555;
  margin-bottom: 5px;
}

.publish {
  font-style: italic;
  color: #666;
}

.amount-article {
  color: black;
}

/* Pagination controls */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover {
  background-color: #0056b3;
}

.amount-article {
  font-size: 16px;
  margin-left: 20px;
}

/* Select input */
#artikel {
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>

