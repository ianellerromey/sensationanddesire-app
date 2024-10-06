$SadContentFiles = Get-ChildItem -Path '.\src\assets\sad-content' -Name 'sad*' -File

$SadContentArray = @($SadContentFiles | ForEach-Object { $i = 0 } {
  @{
    id = $i
    title = [regex]::Matches($_, 'sad_\d+_(.+)\.txt').Groups[1].Value
    content = $_.ToString()
  }; $i++ })
$SadContentArray

$SadBlogFiles = Get-ChildItem -Path '.\src\assets\sad-blog' -Recurse -Include '*.jpg' -File  | % { $_.FullName } | Resolve-Path -Relative
$SadBlogMap = @{}
foreach($SadBlogFile in $SadBlogFiles) {
  $SadBlogFileMatches = [regex]::Matches($SadBlogFile, '\.\\src\\assets\\sad-blog\\(\d+)\\(\d+\.jpg)')
  $SadBlogDate = $SadBlogFileMatches.Groups[1].Value
  $SadBlogValue = $SadBlogFileMatches.Groups[2].Value

  if(!$SadBlogMap.ContainsKey($SadBlogDate)) {
    $SadBlogMap.Add($SadBlogDate, [System.Collections.ArrayList]::new())
  }

  $SadBlogValueWithPath = Join-Path -Path $SadBlogDate -ChildPath $SadBlogValue
  $SadBlogMap[$SadBlogDate].Add($SadBlogValueWithPath)
}
$SadBlogMap

$SadNotice = Get-Content -Path '.\src\assets\sad-notice.txt' | Out-String
if ($SadNotice) { $SadNotice = 'NOTICE: ' + $SadNotice}

$SadMap = @{
  notice = $SadNotice
  disclaimer = Get-Content -Path '.\src\assets\sad-disclaimer.txt' | Out-String
  updates = Get-Content -Path '.\src\assets\sad-updates.txt' | Out-String
  references = Get-Content -Path '.\src\assets\sad-references.txt' | Out-String
  blogs = $SadBlogMap
  sads = $SadContentArray
}
$SadMapJson = ($SadMap | ConvertTo-Json)

New-Item -Path '.\src\assets\sad-map.json' -ItemType 'file' -Value $SadMapJson -Force

Write-Host $SadMapJson