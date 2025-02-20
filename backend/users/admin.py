from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # Revert back to ModelAdmin to avoid default UserAdmin expectations
    list_display = ('username', 'email', 'is_subscribed', 'created_at')
    search_fields = ('username', 'email')
    list_filter = ('is_subscribed',)
    ordering = ('username',)
    
    # Customizing fields shown in the add and edit user forms
    fields = ('username', 'email', 'bot',  'password', 'api_key', 'api_secret', 'is_subscribed', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'created_at', 'updated_at')
    
    # Ensure password is displayed as a hashed value (read-only) when editing
    readonly_fields = ('last_login', 'created_at', 'updated_at')

    def save_model(self, request, obj, form, change):
        if form.cleaned_data.get('password') and not obj.password.startswith('pbkdf2_'):
            obj.set_password(form.cleaned_data['password'])  # Hash password before saving
       
        super().save_model(request, obj, form, change)

