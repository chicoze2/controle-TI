import platform
import psutil
import tkinter as tk
from tkinter import simpledialog
import csv
import subprocess


def get_system_info():
    # Marca e modelo
    try:
        manufacturer = subprocess.check_output("wmic computersystem get manufacturer", shell=True).decode().split("\n")[1].strip()
        model = subprocess.check_output("wmic computersystem get model", shell=True).decode().split("\n")[1].strip()
    except Exception:
        manufacturer, model = "Desconhecido", ""

    # Tipo de equipamento (Desktop ou Laptop)
    try:
        chassis = subprocess.check_output("wmic systemenclosure get chassistypes", shell=True).decode().split("\n")[1].strip()
        if chassis in ["8", "9", "10", "14"]:  # Tipos correspondentes a Notebook
            device_type = "Notebook"
        else:
            device_type = "Computador"
    except Exception:
        device_type = "Computador"

    # Processador
    try:
        cpu = subprocess.check_output("wmic cpu get name", shell=True).decode().split("\n")[1].strip()
    except Exception:
        cpu = platform.processor()

    # Memória RAM
    ram_gb = round(psutil.virtual_memory().total / (1024**3))

    # Disco (pega apenas o principal C:)
    try:
        disk_usage = psutil.disk_usage("C:\\")
        disk_size_gb = round(disk_usage.total / (1024**3))
        # Detecta se é SSD ou HDD
        try:
            media_type = subprocess.check_output(
                "powershell Get-PhysicalDisk | Select MediaType", shell=True
            ).decode()
            if "SSD" in media_type:
                disk_type = "SSD"
            else:
                disk_type = "HDD"
        except Exception:
            disk_type = "Disco"
    except Exception:
        disk_size_gb, disk_type = 0, "Desconhecido"

    # Monta a descrição
    descricao = f"{device_type} {manufacturer} {model} {cpu}, {ram_gb}GB RAM, {disk_size_gb}GB {disk_type}"
    return descricao.strip()


def main():
    # Coleta informações do PC
    descricao = get_system_info()

    # Janela para inputs
    root = tk.Tk()
    root.withdraw()  # Esconde janela principal

    local = simpledialog.askstring("Local do Computador", "Digite o local do computador:")
    if not local or local.strip() == "":
        return

    patrimonio = simpledialog.askstring("Patrimônio", "Digite o número de patrimônio (ou deixe vazio):")

    if not patrimonio or patrimonio.strip() == "":
        nome = "Sem identificador de patrimônio"
    else:
        nome = patrimonio.strip()

    # Grava no CSV
    with open("data.csv", "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerow([nome, descricao, local])

    print("Informações salvas em data.csv")


if __name__ == "__main__":
    main()