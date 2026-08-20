# Stage 1: Build the application using Maven and Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the JAR file
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]