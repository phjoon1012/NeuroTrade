# Generated by Django 4.2.18 on 2025-02-10 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("strategies", "0002_alter_trade_trade_time"),
    ]

    operations = [
        migrations.RemoveField(model_name="trade", name="trade_time",),
    ]
