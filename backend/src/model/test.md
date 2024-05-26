[Model list](https://gitlab.bht-berlin.de/jala5026/kimbaa/-/wikis/Model-list)

## Guidelines for Creating Mongoose Models
As a new developer on our project, here's a set of guidelines to help you create Mongoose models in a consistent and secure manner. The following key aspects should be considered when designing new models:

### 1. Schema Definition

Define your schema using mongoose.Schema, specifying the data types and constraints for each field.
Use required to enforce mandatory fields and unique to ensure unique ness where needed.
Add descriptive comments to each field to explain its purpose.

```typescript
const ExampleSchema = new Schema({
  name: { type: string, required: true }, // User's name
  age: { type: Number, min: 0 }, // Age with a minimum value
  email: { type: string, unique: true, required: true }, // Unique email
```

### 2. Field Validation

Use the validate property to define custom validators. This can be useful for enforcing patterns or length constraints. 
Ensure validation messages are clear and informative. 

```typescript
const UserSchema = new Schema({
  studentId: {
    type: string,
    required: true,
    unique: true,
    validate: {
      validator: (v) => v.tostring().length >= 6,
      message: "Student ID must be at least 6 characters long.",

    },
  },
 });
```

---

### 3. Pre-Save Hooks

If your model involves sensitive data like passwords, use pre-save hooks to hash and secure the data.
Ensure the hook logic is efficient to avoid performance bottlenecks. 

```typescript
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});
```

### 4. Query Validation

For operations like findOneAndUpdate or updateOne, validate key conditions. This can prevent unauthorized changes or invalid queries. 
Use next to continue the middleware chain or return an error if a condition isn't met.

``` typescript
UserSchema.pre("findOneAndUpdate", function (next) {
  if (!this.getQuery().studentId) {
    return next(new Error("Updates must be made using studentId."));
  }
  next();
 });
```

### 5. Custom Methods

Implement custom methods to add functionality to your model. For example, a method to check if a given password is correct. 
Ensure methods are asynchronous where appropriate, especially if they involve I/O operations like database queries or password hashing.
  
```typescript
UserSchema.methods.isCorrectPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
```

### 6. Logging and Error Handling

Use a centralized logging system to track key events and errors. This aids in debugging and monitoring. 
Always handle errors gracefully and log relevant information. 

```typescript
import { logger } from "../backlogger";
  UserSchema.methods.isCorrectPassword = async function (password) {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
  } catch (error) {
      logger.error("Error comparing passwords: " + error);
      throw error;
  }
};
```

### 7. Exporting Models

Use a consistent pattern for exporting models. This makes it easier for other developers to import and use them in other parts of the project.

```typescript
export const User = model<IUser, UserModel>("User", UserSchema);
```
