# Generated by Django 4.2.18 on 2025-02-16 23:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("strategies", "0005_trade_trade_type_alter_trade_trade_time"),
        ("users", "0005_remove_botstatistics_bot_remove_trade_bot_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="bot",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="owner",
                to="strategies.bot",
            ),
        ),
    ]
