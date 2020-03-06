<template>
  <div class="dashboard">
    <b-card>
      <Header />
      <div class="content">
        <slot />
      </div>
    </b-card>
  </div>
</template>
<script>
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  align-self: flex-start;
  flex: 1;
}
.dashboard .navbar {
  background: #eceeef;
}

.dashboard .nav-link {
  font-size: 18px;
  font-weight: bold;
}

.dashboard .content {
  margin-top: 20px;
}

.input-search {
  border: 0;
}

.table-responsive {
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px solid #ddd;
}

.table-responsive .col {
  flex: 2;
}
.table-responsive .col-actions {
  flex: 1;
}

tbody td {
  height: 80px;
}

@media (min-width: 375px) {
  .dashboard {
    min-width: 375px;
  }

  .badges {
    position: relative;
  }
}
@media (min-width: 576px) {
  .dashboard {
    min-width: 576px;
  }
  .badges {
    position: relative;
  }
}

@media (min-width: 768px) {
  .dashboard {
    min-width: 768px;
  }
  .badges {
    position: absolute;
  }
}

@media (min-width: 992px) {
  .dashboard {
    min-width: 992px;
  }
  .badges {
    position: absolute;
  }
}

@media (min-width: 1200px) {
  .dashboard {
    min-width: 1200px;
  }
  .badges {
    position: absolute;
  }
}
</style>
