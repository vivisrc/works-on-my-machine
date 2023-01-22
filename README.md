![works on my machine](works.png)

# How use???

```yaml
# /.github/workflows/works-on-my-machine.yml
on:
  issues:
    types: [opened]
jobs:
  works:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: works on my machine
        uses: vivisrc/works-on-my-machine@main
```
