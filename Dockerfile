# Use a lightweight Java 17 runtime
FROM eclipse-temurin:17-jre

# Set workdir
WORKDIR /app

# Copy the built jar from the target folder
# The jar name should match your artifact/version
COPY target/app-0.0.1-SNAPSHOT.jar app.jar

# Environment and port
ENV PORT=8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/app.jar"] 