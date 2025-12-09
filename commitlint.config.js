export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nouvelle fonctionnalité
        "fix", // Correction de bug
        "docs", // Documentation
        "style", // Formatage, point-virgules manquants, etc.
        "refactor", // Refactoring du code
        "perf", // Amélioration des performances
        "test", // Ajout de tests
        "build", // Changements du système de build
        "ci", // Changements des fichiers de CI
        "chore", // Autres changements (maintenance)
        "revert", // Revert d'un commit précédent
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};
