# -------- Stage 1: Build the application --------
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /workspace

# Copy pom and source
COPY pom.xml ./
COPY src ./src

# Build the application (skip tests for faster build)
RUN mvn -q -e -DskipTests clean package

# -------- Stage 2: Runtime image --------
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy built jar from the builder stage
COPY --from=builder /workspace/target/app-0.0.1-SNAPSHOT.jar /app/app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"] 