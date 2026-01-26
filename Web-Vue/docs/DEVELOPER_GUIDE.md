# 👨‍💻 Developer Guide

A comprehensive guide for developers working on the Vue 3 salon booking application. This guide covers setup, development workflows, coding standards, and best practices using the Composition API, TypeScript, and modern Vue ecosystem.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [💻 Development Environment](#-development-environment)
- [🏗️ Project Setup](#️-project-setup)
- [📝 Coding Standards](#-coding-standards)
- [🔧 Development Workflows](#-development-workflows)
- [🐛 Debugging](#-debugging)
- [🛠️ Common Tasks](#️-common-tasks)
- [❓ Troubleshooting](#-troubleshooting)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended IDE ([Download](https://code.visualstudio.com/))
- **Backend Service**: Running backend API (see Backend-Service/README.md)

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```
- Volar (Vue.volar) - Vue 3 language support
- TypeScript Vue Plugin (Vue.vscode-typescript-vue-plugin)
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Path Intellisense (christian-kohler.path-intellisense)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- GitLens (eamodio.gitlens)
```

---

## 💻 Development Environment

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd online-saloon-service-booking/Web-Vue
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your local configuration (see [Environment Variables](#-environment-variables))

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🏗️ Project Setup

### TypeScript Configuration

The project uses TypeScript with Vue 3. See [tsconfig.json](../tsconfig.json) for configuration.

**Key TypeScript Settings:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

### NPM Scripts

```json
{
  "dev": "vite",                                    // Start dev server with hot reload
  "build": "vue-tsc && vite build",                 // Type check and build for production
  "preview": "vite preview",                        // Preview production build locally
  "test": "vitest",                                 // Run all tests
  "test:watch": "vitest --watch",                   // Run tests in watch mode
  "test:coverage": "vitest --coverage",             // Generate coverage report
  "lint": "eslint src --ext .vue,.ts",              // Lint Vue and TypeScript files
  "lint:fix": "eslint src --ext .vue,.ts --fix",    // Fix linting errors
  "format": "prettier --write \"src/**/*.{vue,ts,css}\"", // Format code with Prettier
  "type-check": "vue-tsc --noEmit"                  // Check types without emitting files
}
```

---

## 📝 Coding Standards

### Vue Component Style Guide

#### 1. File Naming Conventions

```
Components:  PascalCase (ServiceCard.vue, BaseButton.vue)
Views:       PascalCase (Home.vue, Services.vue)
Composables: camelCase (useAuth.ts, useServices.ts)
Stores:      camelCase (auth.ts, services.ts)
Types:       camelCase (auth.types.ts, service.types.ts)
Utils:       camelCase (helpers.ts, formatters.ts)
```

#### 2. Component Structure

**Always use `<script setup>` with TypeScript:**
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Service } from '@/types/service.types';

// Props definition
interface Props {
  service: Service;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

// Emits definition
const emit = defineEmits<{
  update: [value: string];
  delete: [];
}>();

// Reactive state
const count = ref(0);

// Computed properties
const isValid = computed(() => count.value > 0);

// Methods
const handleClick = () => {
  emit('update', 'new-value');
};

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div class="component">
    <!-- Template content -->
  </div>
</template>

<style scoped>
/* Scoped styles (prefer Tailwind classes) */
</style>
```

#### 3. Props and Emits

**Always define props with TypeScript interfaces:**
```typescript
// ✅ Good
interface Props {
  service: Service;
  isLoading?: boolean;
  onComplete?: (result: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
});

// ❌ Avoid
const props = defineProps({
  service: Object,
  isLoading: Boolean
});
```

**Always define emits with type signatures:**
```typescript
// ✅ Good
const emit = defineEmits<{
  update: [id: string, value: number];
  delete: [];
  close: [reason: string];
}>();

// ❌ Avoid
const emit = defineEmits(['update', 'delete', 'close']);
```

#### 4. Composables Pattern

**Create reusable composables for shared logic:**
```typescript
// composables/useCounter.ts
import { ref, computed, readonly } from 'vue';

export const useCounter = (initialValue: number = 0) => {
  const count = ref(initialValue);

  const double = computed(() => count.value * 2);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  return {
    count: readonly(count),
    double,
    increment,
    decrement,
    reset
  };
};
```

**Usage in component:**
```vue
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';

const { count, double, increment, decrement, reset } = useCounter(10);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

#### 5. Naming Conventions

```typescript
// Components: PascalCase
const ServiceCard = defineComponent({});

// Variables and functions: camelCase
const currentUser = ref(null);
const fetchUserData = async () => {};

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Interfaces/Types: PascalCase
interface UserData {
  id: string;
  name: string;
}

type ServiceStatus = 'active' | 'inactive' | 'pending';
```

### Component Development Pattern

**Feature Component Example:**

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useServices } from '@/composables/useServices';
import type { Service } from '@/types/service.types';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';

interface Props {
  categoryId?: string;
  limit?: number;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 10
});

const emit = defineEmits<{
  serviceSelected: [service: Service];
}>();

const router = useRouter();
const { services, loading, error, fetchServices } = useServices();

const filteredServices = computed(() => {
  let result = services.value;

  if (props.categoryId) {
    result = result.filter(s => s.categoryId === props.categoryId);
  }

  return result.slice(0, props.limit);
});

const handleServiceClick = (service: Service) => {
  emit('serviceSelected', service);
  router.push(`/services/${service.id}`);
};

onMounted(async () => {
  await fetchServices();
});
</script>

<template>
  <div class="service-list">
    <div v-if="loading" class="text-center py-8">
      <span class="animate-spin">Loading...</span>
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-8">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="service in filteredServices"
        :key="service.id"
        class="cursor-pointer hover:shadow-lg transition-shadow"
        @click="handleServiceClick(service)"
      >
        <img
          :src="service.imageUrl"
          :alt="service.name"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ service.name }}</h3>
          <p class="text-gray-600 mb-4">{{ service.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">${{ service.price }}</span>
            <BaseButton size="sm" variant="primary">
              Book Now
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
/* Prefer Tailwind classes over custom styles */
</style>
```

### Form Handling with VeeValidate

**Login Form Example:**

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const router = useRouter();
const { login, loading } = useAuth();

// Validation schema
const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

// Setup form
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  const success = await login(values.email, values.password);

  if (success) {
    router.push('/');
  }
});
</script>

<template>
  <form @submit="onSubmit" class="max-w-md mx-auto space-y-4">
    <div>
      <BaseInput
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        label="Email"
        placeholder="Enter your email"
        :error="errors.email"
      />
    </div>

    <div>
      <BaseInput
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :error="errors.password"
      />
    </div>

    <BaseButton
      type="submit"
      variant="primary"
      class="w-full"
      :is-loading="loading"
    >
      Login
    </BaseButton>
  </form>
</template>
```

---

## 🔧 Development Workflows

### Adding a New Feature

Follow these steps when adding a new feature:

#### 1. Define Types

```typescript
// src/types/feature.types.ts
export interface Feature {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateFeatureData {
  name: string;
  description: string;
}

export interface UpdateFeatureData {
  name?: string;
  description?: string;
  isActive?: boolean;
}
```

#### 2. Create API Service

```typescript
// src/api/features.api.ts
import api from './axios.config';
import type { Feature, CreateFeatureData, UpdateFeatureData } from '@/types/feature.types';
import type { AxiosResponse } from 'axios';

export const featuresAPI = {
  getAll(): Promise<AxiosResponse<Feature[]>> {
    return api.get('/features');
  },

  getById(id: string): Promise<AxiosResponse<Feature>> {
    return api.get(`/features/${id}`);
  },

  create(data: CreateFeatureData): Promise<AxiosResponse<Feature>> {
    return api.post('/features', data);
  },

  update(id: string, data: UpdateFeatureData): Promise<AxiosResponse<Feature>> {
    return api.put(`/features/${id}`, data);
  },

  delete(id: string): Promise<AxiosResponse<void>> {
    return api.delete(`/features/${id}`);
  }
};
```

#### 3. Create Composable

```typescript
// src/composables/useFeatures.ts
import { ref, readonly } from 'vue';
import { featuresAPI } from '@/api/features.api';
import type { Feature, CreateFeatureData, UpdateFeatureData } from '@/types/feature.types';
import { useToast } from '@/composables/useToast';

export const useFeatures = () => {
  const features = ref<Feature[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const fetchFeatures = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await featuresAPI.getAll();
      features.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch features';
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const createFeature = async (data: CreateFeatureData): Promise<Feature | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await featuresAPI.create(data);
      features.value.push(response.data);
      toast.success('Feature created successfully');
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create feature';
      toast.error(error.value);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateFeature = async (id: string, data: UpdateFeatureData): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await featuresAPI.update(id, data);
      const index = features.value.findIndex(f => f.id === id);
      if (index !== -1) {
        features.value[index] = response.data;
      }
      toast.success('Feature updated successfully');
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update feature';
      toast.error(error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteFeature = async (id: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await featuresAPI.delete(id);
      features.value = features.value.filter(f => f.id !== id);
      toast.success('Feature deleted successfully');
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete feature';
      toast.error(error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    features: readonly(features),
    loading: readonly(loading),
    error: readonly(error),
    fetchFeatures,
    createFeature,
    updateFeature,
    deleteFeature
  };
};
```

#### 4. Create Component

```vue
<!-- src/components/features/FeatureCard.vue -->
<script setup lang="ts">
import type { Feature } from '@/types/feature.types';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';

interface Props {
  feature: Feature;
}

defineProps<Props>();

const emit = defineEmits<{
  edit: [feature: Feature];
  delete: [featureId: string];
}>();

const handleEdit = () => {
  emit('edit', props.feature);
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this feature?')) {
    emit('delete', props.feature.id);
  }
};
</script>

<template>
  <BaseCard>
    <div class="p-4">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-semibold">{{ feature.name }}</h3>
        <span
          class="px-2 py-1 text-xs rounded"
          :class="feature.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
        >
          {{ feature.isActive ? 'Active' : 'Inactive' }}
        </span>
      </div>

      <p class="text-gray-600 mb-4">{{ feature.description }}</p>

      <div class="flex gap-2">
        <BaseButton size="sm" variant="secondary" @click="handleEdit">
          Edit
        </BaseButton>
        <BaseButton size="sm" variant="outline" @click="handleDelete">
          Delete
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>
```

#### 5. Create View

```vue
<!-- src/views/Features.vue -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { useFeatures } from '@/composables/useFeatures';
import FeatureCard from '@/components/features/FeatureCard.vue';
import BaseLoader from '@/components/common/BaseLoader.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const {
  features,
  loading,
  error,
  fetchFeatures,
  deleteFeature
} = useFeatures();

const handleEdit = (feature: Feature) => {
  // Navigate to edit page or open modal
  console.log('Edit feature:', feature);
};

const handleDelete = async (featureId: string) => {
  await deleteFeature(featureId);
};

onMounted(() => {
  fetchFeatures();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Features</h1>
      <BaseButton variant="primary">
        Add Feature
      </BaseButton>
    </div>

    <BaseLoader v-if="loading" class="py-12" />

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard
        v-for="feature in features"
        :key="feature.id"
        :feature="feature"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
```

#### 6. Add Route

```typescript
// src/router/index.ts
{
  path: '/features',
  name: 'features',
  component: () => import('@/views/Features.vue'),
  meta: {
    requiresAuth: true,
    title: 'Features'
  }
}
```

---

## 🐛 Debugging

### Vue DevTools

Install Vue DevTools browser extension for debugging:
- Chrome: [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/)
- Firefox: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

### Console Debugging

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';

const count = ref(0);

// Watch for debugging
watch(count, (newValue, oldValue) => {
  console.log('Count changed:', { oldValue, newValue });
}, { immediate: true });

// Debug in methods
const increment = () => {
  console.log('Before increment:', count.value);
  count.value++;
  console.log('After increment:', count.value);
};
</script>
```

### Error Tracking

```typescript
// composables/useErrorTracking.ts
import { onErrorCaptured } from 'vue';

export const useErrorTracking = () => {
  onErrorCaptured((err, instance, info) => {
    console.error('Error captured:', {
      error: err,
      component: instance,
      info
    });

    // Send to error tracking service
    // trackError(err, { component: instance?.type?.name, info });

    return false; // Propagate error
  });
};
```

---

## 🛠️ Common Tasks

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_API_TIMEOUT=30000

# Payment Gateway
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# OR
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx

# App Configuration
VITE_APP_NAME=Salon Booking
VITE_APP_URL=http://localhost:5173

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
```

**Access environment variables:**
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
```

### Working with Tailwind CSS

**Configure Tailwind:**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
```

### Adding Third-Party Libraries

```bash
# Install package
npm install package-name

# Install types (if needed)
npm install -D @types/package-name
```

**Example: Adding date-fns**
```bash
npm install date-fns
```

```typescript
// utils/date.ts
import { format, parseISO, addDays } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};
```

---

## ❓ Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3000
```

#### 2. Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### 3. TypeScript Errors

```bash
# Check types without building
npm run type-check

# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

#### 4. Hot Reload Not Working

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

#### 5. Build Errors

```bash
# Clean build directory
rm -rf dist/

# Rebuild
npm run build

# Check for TypeScript errors
npm run type-check
```

#### 6. CORS Errors

Ensure backend CORS is configured:
```typescript
// Backend: server.ts
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

Or use Vite proxy:
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

### Getting Help

- Check [ARCHITECTURE.md](ARCHITECTURE.md) for design patterns
- Check [QUALITY_STRATEGY.md](QUALITY_STRATEGY.md) for testing guidelines
- Check [STYLING_GUIDE.md](STYLING_GUIDE.md) for styling conventions
- Review existing code for similar implementations
- Use Vue DevTools for debugging
- Check browser console for errors

---

## 📖 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/)

---

**Happy coding! 🚀**
