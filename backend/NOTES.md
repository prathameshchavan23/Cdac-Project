Explanation of Lombok Annotations
@Getter & @Setter: Automatically generates all getter and setter methods for every non-static field.

@NoArgsConstructor: Generates a no-argument constructor. This is required by JPA.

@AllArgsConstructor: (Optional) Generates a constructor with arguments for all fields. I've left your custom constructor in for now, but you could use this instead.

@Data: (Powerful but use with caution) A shortcut that bundles @Getter, @Setter, @ToString, @EqualsAndHashCode, and @RequiredArgsConstructor together. It's often better to use specific annotations like @Getter and @Setter for JPA entities to avoid potential performance issues with hashCode() on lazy-loaded relationships.