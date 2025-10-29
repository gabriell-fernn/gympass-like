export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'Check-in validation is late. You can only validate a check-in within 20 minutes of its creation.',
    )
  }
}
