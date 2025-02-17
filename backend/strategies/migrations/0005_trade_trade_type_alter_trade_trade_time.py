# Generated by Django 4.2.18 on 2025-02-10 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("strategies", "0004_remove_trade_trade_type_trade_trade_time"),
    ]

    operations = [
        migrations.AddField(
            model_name="trade",
            name="trade_type",
            field=models.CharField(
                choices=[("BUY", "Buy"), ("SELL", "Sell")], default="BUY", max_length=10
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="trade", name="trade_time", field=models.DateTimeField(),
        ),
    ]
