$SadContentFiles = Get-ChildItem -Path '.\src\assets\sad-content' -Name 'sad*' -File
$SadContentArrayMap = @($SadContentFiles | ForEach-Object { $i = 0 } {
  @{
    id = $i
    title = [regex]::Matches($_, 'sad_\d+_(.+)\.txt').Groups[1].Value
    content = $_.ToString()
  }; $i++ })
$SadContentArrayMap
$SadContentMap = @{
  sads = $SadContentArrayMap
}
$SadContent = ($SadContentMap | ConvertTo-Json)

New-Item -Path '.\src\assets\sad-map.json' -ItemType 'file' -Value $SadContent -Force

Write-Host $SadContent