-- Add Korean (ko) locale support to chat groups
alter table chat_groups drop constraint if exists chat_groups_locale_check;
alter table chat_groups add constraint chat_groups_locale_check check (locale in ('en', 'ja', 'ko'));
