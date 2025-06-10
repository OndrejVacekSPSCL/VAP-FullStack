# Popis API endpointů

## API Endpointy `/api/tasks`

### 1. Získání všech úkolů
- **URL:** `/api/tasks`
- **Metoda:** `GET`
- **Popis:** Vrátí všechny úkoly.
- **Odpověď:**
    ```json
    [
      {
        "id": 1,
        "title": "Název úkolu",
        "status": "pending"
      }
    ]
    ```
- **Status kódy:**  
  `200 OK`, `500 Internal Server Error`

---

### 2. Vytvoření nového úkolu
- **URL:** `/api/tasks`
- **Metoda:** `POST`
- **Popis:** Vytvoří nový úkol.
- **Tělo požadavku:**
    ```json
    {
      "title": "Název úkolu",
      "status": "pending"
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Item created" }
    ```
- **Status kódy:**  
  `201 Created`, `500 Internal Server Error`

---

### 3. Získání úkolu podle ID
- **URL:** `/api/tasks/:id`
- **Metoda:** `GET`
- **Popis:** Vrátí úkol podle ID.
- **Odpověď:**
    ```json
    {
      "id": 1,
      "title": "Název úkolu",
      "status": "pending"
    }
    ```
- **Status kódy:**  
  `200 OK`, `404 Not Found`, `500 Internal Server Error`

---

### 4. Úprava úkolu podle ID
- **URL:** `/api/tasks/:id`
- **Metoda:** `PUT`
- **Popis:** Aktualizuje úkol podle ID.
- **Tělo požadavku:**
    ```json
    {
      "title": "Nový název",
      "status": "done"
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Item updated" }
    ```
- **Status kódy:**  
  `201 Created`, `404 Not Found`, `500 Internal Server Error`

---

### 5. Smazání úkolu podle ID
- **URL:** `/api/tasks/:id`
- **Metoda:** `DELETE`
- **Popis:** Smaže úkol podle ID.
- **Odpověď:**
    ```json
    { "message": "Item deleted" }
    ```
- **Status kódy:**  
  `201 Created`, `404 Not Found`, `500 Internal Server Error`

## API Endpointy `/api/members`

### 1. Získání všech členů
- **URL:** `/api/members`
- **Metoda:** `GET`
- **Popis:** Vrátí všechny členy.
- **Odpověď:**
    ```json
    [
      {
        "id": 1,
        "name": "Jan Novák",
        "email": "jan.novak@example.com"
      }
    ]
    ```
- **Status kódy:**  
  `200 OK`, `500 Internal Server Error`

---

### 2. Vytvoření nového člena
- **URL:** `/api/members`
- **Metoda:** `POST`
- **Popis:** Vytvoří nového člena.
- **Tělo požadavku:**
    ```json
    {
      "name": "Jan Novák",
      "email": "jan.novak@example.com"
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Member created" }
    ```
- **Status kódy:**  
  `201 Created`, `500 Internal Server Error`

---

### 3. Získání člena podle ID
- **URL:** `/api/members/:id`
- **Metoda:** `GET`
- **Popis:** Vrátí člena podle ID.
- **Odpověď:**
    ```json
    {
      "id": 1,
      "name": "Jan Novák",
      "email": "jan.novak@example.com"
    }
    ```
- **Status kódy:**  
  `200 OK`, `404 Not Found`, `500 Internal Server Error`

---

### 4. Úprava člena podle ID
- **URL:** `/api/members/:id`
- **Metoda:** `PUT`
- **Popis:** Aktualizuje člena podle ID.
- **Tělo požadavku:**
    ```json
    {
      "name": "Petr Svoboda",
      "email": "petr.svoboda@example.com"
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Member updated" }
    ```
- **Status kódy:**  
  `201 Created`, `404 Not Found`, `500 Internal Server Error`

---

### 5. Smazání člena podle ID
- **URL:** `/api/members/:id`
- **Metoda:** `DELETE`
- **Popis:** Smaže člena podle ID.
- **Odpověď:**
    ```json
    { "message": "Member deleted" }
    ```
- **Status kódy:**  
  `201 Created`, `404 Not Found`, `500 Internal Server Error`

## API Endpointy `/api/task_assignments`

### 1. Získání všech přiřazení (včetně detailů tasku a člena)
- **URL:** `/api/task_assignments`
- **Metoda:** `GET`
- **Popis:** Vrátí všechna přiřazení úkolů členům včetně detailů úkolu a člena.
- **Odpověď:**
    ```json
    [
      {
        "id": 1,
        "task": {
          "id": 2,
          "title": "Název úkolu",
          "status": "pending"
        },
        "member": {
          "id": 3,
          "firstname": "Jan",
          "lastname": "Novák"
        }
      }
    ]
    ```
- **Status kódy:**  
  `200 OK`, `500 Internal Server Error`

---

### 2. Vytvoření nového přiřazení
- **URL:** `/api/task_assignments`
- **Metoda:** `POST`
- **Popis:** Přiřadí úkol členovi.
- **Tělo požadavku:**
    ```json
    {
      "task_id": 2,
      "member_id": 3
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Member assigned to task", "task_id": 2, "member_id": 3 }
    ```
- **Status kódy:**  
  `200 OK`, `500 Internal Server Error`

---

### 3. Aktualizace přiřazení podle ID
- **URL:** `/api/task_assignments/:id`
- **Metoda:** `PUT`
- **Popis:** Aktualizuje přiřazení (změní přiřazený úkol nebo člena).
- **Tělo požadavku:**
    ```json
    {
      "task_id": 2,
      "member_id": 3
    }
    ```
- **Odpověď:**
    ```json
    { "message": "Assignment updated" }
    ```
- **Status kódy:**  
  `200 OK`, `404 Not Found`, `500 Internal Server Error`

---

### 4. Smazání přiřazení podle ID
- **URL:** `/api/task_assignments/:id`
- **Metoda:** `DELETE`
- **Popis:** Smaže přiřazení podle ID.
- **Odpověď:**
    ```json
    { "message": "Assignment deleted" }
    ```
- **Status kódy:**  
  `200 OK`, `404 Not Found`, `500 Internal Server Error`