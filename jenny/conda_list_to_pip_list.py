import subprocess

# Conda 환경에서 패키지 목록을 가져옴
result = subprocess.run(['conda', 'list', '--export'], capture_output=True, text=True)

# 출력된 목록에서 각 항목을 줄 단위로 처리
packages = result.stdout.splitlines()

# Pip에서 사용하는 포맷으로 변환하고 .txt 파일로 저장
with open('./jenny/requirements.txt', 'w') as f:
    for package in packages:
        # skip Conda-specific annotations (~=, ==, etc.)
        cleaned_package = package.split('=')[0]  # 패키지 이름만 가져오기
        f.write(f"{cleaned_package}\n")