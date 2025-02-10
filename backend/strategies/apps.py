from django.apps import AppConfig

class StrategiesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'strategies'

    def ready(self):
        import strategies.signals  # ✅ Import signals when app is ready
